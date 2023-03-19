
const mongoose = require("mongoose")


const orderSchema = new mongoose.Schema({

    user : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "user",
        require : true,
        unique : true 
    } ,
    food : {
        type : Array ,
        require : true
    }

} , { timestamps: true } )


module.exports = mongoose.model("order" , orderSchema)