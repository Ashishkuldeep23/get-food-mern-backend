const mongoose = require('mongoose')



const getAllData = async function (req, res) {

    try {
        let fatch_food_items = await mongoose.connection.db.collection("food_items");
        let food_items = await fatch_food_items.find({}).toArray()

        if( typeof(food_items) !== 'object'){
            console.log("Error")
            return res.status(404).send({status : false , message : "Error in getting data of food_items"})
        }else{
            global.find_items = food_items
            // console.log(global.find_items)
        }



        let fatch_food_cat = await mongoose.connection.db.collection("food_cat");
        let food_cat = await fatch_food_cat.find({}).toArray()

        if( typeof(food_cat) !== 'object'){
            console.log("Error")
            return res.status(404).send({status : false , message : "Error in getting data of food_cat"})
        }else{
            global.find_cat = food_cat
            // console.log(global.find_cat)
        }


        res.status(200).send({status : true , data : [global.find_items , global.find_cat]})


    } catch (e) {
        res.status(500).send({ status: false, message: e.message })
    }
}






module.exports = getAllData