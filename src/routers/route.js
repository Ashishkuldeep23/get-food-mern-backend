const express = require("express")

const router = express.Router()

const {createUser , logInUser} = require("../controller/userController")
const getAllData = require("../controller/getData")

// // For check only --->
router.get( "/" , (req , res)=>{res.send("Server Open HaHaHa")} )


// // // Create New user ---->

router.post( "/signIn" , createUser)


// // // loginguser ---->
router.post( "/logIn" , logInUser)


// // // Gwet data on load ------------------->
router.get("/getFoodData" , getAllData)

router.get("/*" , (req , res)=>{
    res.status(400).send({status:false , message : "Path not found in this app."})
})

module.exports = router
