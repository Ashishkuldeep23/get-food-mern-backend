const express = require("express")
const mongoose = require("mongoose")
const router = require("./src/routers/route")
require('dotenv').config()

const app = express()

// // console.log(process.env.token)

mongoose.connect(process.env.token )
.then( ()=>console.log("DB connected"))
.catch( (e)=>console.log(e))


// app.get( '/' , (req ,res)=>{
//     res.send("Hello World!")
// } )

// // // Below for handle CORS Policy error --------->
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", process.env.frontend );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use(express.json())

app.use( '/', router)


const port = 3001 || process.env.port
app.listen(port , ()=>{
    console.log("Express app running at",port)
})