
const jwt = require("jsonwebtoken")

const orderModel = require("../model/OrderSchema")


async function newOrder(req , res){
    try{
        let token = req.body.token
        let verfyToken = jwt.verify(token , "getFoodfirst" )
        let findOrder = await orderModel.findOne({user : verfyToken.userId})

        if(!findOrder){
            let createFirstOrder = await orderModel.create( {
                user : verfyToken.userId ,
                food : [req.body.food]
            } )

            return res.status(200).send({status : true , message : "Successful , new order created for this user." })
        }else{
            let pushNewOrder = await orderModel.findOneAndUpdate( 
                {user : verfyToken.userId} , 
                { $push : { food : req.body.food } }
            )

            return res.status(200).send({status : true , message : "Successful , Order list updated." })

        }


    }catch(e){

        if(e.message === "invalid signature"){
            return res.status(401).send({status : false , message : "Authentication failed.Please LogIn Again"})
        }

        res.status(500).send({status : false , message : e.message})
    }

} 







async function getOrder(req ,res){
    try{
        let token = req.body.token
        let verfyToken = jwt.verify(token , "getFoodfirst" )

        let findOrder = await orderModel.findOne({user : verfyToken.userId})

        // // // Now this data not found is done on frontend ---->
        // if(!findOrder){
        //     return res.status(400).send({status : false , message : "No order found , please add item in cart and press button Check Out"})
        // }

        return res.status(200).send({status : true , data : findOrder , message : "Successful" })

    }catch(e){
        
        if(e.message === "invalid signature"){
            return res.status(401).send({status : false , message : "Authentication failed.Please LogIn Again"})
        }

        res.status(500).send({status : false , message : e.message})
    }
}


module.exports = {newOrder , getOrder}