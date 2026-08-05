const express = require("express");
const app = express();

// app.use("/",(req,res)=>{
//     res.send("Hello node.js")
// })
app.use("/test",(req,res)=>{
    res.send("Hello from test")
})
app.listen(4000,()=>{
    console.log("Server has Statrted")
})