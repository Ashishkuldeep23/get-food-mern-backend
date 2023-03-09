
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


const userModel = require("../model/userSchema")


// // Some imrotant regex are ----------->

const nameValidation = (/^[a-zA-Z]+([\s][a-zA-Z]+)*$/);
const addressValidation = (/^[a-zA-Z0-9#?!@$%^&*-,. |]*$/);
const emailValidation = (/^([a-z0-9._%-]+@[a-z0-9.-]+\.[a-z]{2,6})*$/);
const passwordValidation = (/^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,15}$/)


const { isValidEntry } = require("../validator/validator")




// // // Create user controller ---------->

const createUser = async function (req, res) {

    try {


        const { name, address, email, password, whenCreated } = req.body

        // // // Some validation here --------->
        if (!isValidEntry(name) || !nameValidation.test(name)) return res.status(400).send({ status: false, message: "please enter a valid name" })

        if (!isValidEntry(email) || !emailValidation.test(email)) return res.status(400).send({ status: false, message: "Email is invalid, Please check your Email address" });

        if (!isValidEntry(password) || !passwordValidation.test(password)) return res.status(400).send({ status: false, message: "use a strong password at least =>  one special , one lowercase (character) and one numericValue and password must be six digit)" });

        if (!isValidEntry(address) || !addressValidation.test(address)) return res.status(400).send({ status: false, message: "please enter a valid Address only these [a-zA-Z0-9#?!@$%^&*-,.|] allowed" })


        // // Already email ---->

        const alreadyEmail = await userModel.findOne({email:email})

        if(alreadyEmail){
            return res.status(400).send({status:false , message : "Email Already used!"})
        }



        let salt = await bcrypt.genSalt(10)
        let newPass = await bcrypt.hash(password, salt)
        const createData = await userModel.create({ name: name, address: address, password: newPass, email: email , whenCreated : whenCreated})

        res.status(201).send({ status: true, data: createData })

    }
    catch (e) {
        res.status(500).send({status : false , message : e.message})
    }

}



// // // Login user ------->

const logInUser = async function(req , res){

    try{

        const {email , password} = req.body

        if (!isValidEntry(email) || !emailValidation.test(email)) return res.status(400).send({ status: false, message: "Email is invalid, Please check your Email address." });

        
        let userDataInDB = await userModel.findOne({email:email})
        
        if(!userDataInDB) return res.status(400).send({status:false , message : "Email not present in Database."})

        
        let passCompare = await bcrypt.compare(password , userDataInDB.password)
        
        // console.log("Yess")
        if(!passCompare) return res.status(400).send({status: false , message : "Password not matched with DB password"})


        const token = jwt.sign({ userId: userDataInDB._id.toString() }, "getFoodfirst" )

        res.status(200).send({status:true , token : token ,  data : userDataInDB , message : "LogIn successful"})

    }catch(e){
        res.status(500).send({status : false , message : e.message})
    }

}



module.exports = { createUser , logInUser }

