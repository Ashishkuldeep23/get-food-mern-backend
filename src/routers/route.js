const express = require("express")

const router = express.Router()

const {createUser , logInUser} = require("../controller/userController")
const getAllData = require("../controller/getData")
const {newOrder , getOrder} = require("../controller/orderController")




// // For check only --->
router.get( "/" , (req , res)=>{res.send("Server Open HaHaHa")} )


// // // Create New user ---->
router.post( "/signIn" , createUser)


// // // loginguser ---->
router.post( "/logIn" , logInUser)

// // // Gwet data on load (main data of foods) ------------------->
router.get("/getFoodData" , getAllData)

// // // create new order --------->
router.post( "/newOrder" , newOrder )

// // // get all orders ------------------------>
router.post("/getOrder" , getOrder )



router.get("/*" , (req , res)=>{
    res.status(400).send({status:false , message : "Path not found in this app."})
})

module.exports = router
