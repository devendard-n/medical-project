const express = require("express")
const router = express.Router()

const { readData } = require("../utils/fileDB")

router.post("/login",(req,res)=>{

 const admin = readData("./data/admin.json")

 const {username,password} = req.body

 if(username === admin.username && password === admin.password){

   return res.json({
     success:true
   })

 }

 res.json({
   success:false
 })

})

module.exports = router