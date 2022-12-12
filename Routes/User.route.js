const { Router } = require("express");

const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { UserModule } = require("../modules/User.module");
require("dotenv").config()

const userController = Router();

userController.post("/signup", async(req,res)=>{
    const {email,password}= req.body;
    bcrypt.hash(password,5,async function(err,hash){
        if(err){
            res.send("something went wrong")
        }
        const user = new UserModule({
            email,
            password:hash,
            IP:req.ip
        })
        try{
            await user.save()
            res.send({"msg":"signup Successfully"})
        }catch(err){
            res.send({"msg":"Try again later"})
        }
    })
})

//login

userController.post("/login", async(req,res)=>{
    const {email,password}= req.body;
    const user= await UserModule.findOne({email})

    const hashed_password= user.password ;
    
    bcrypt.compare(password,hashed_password, function(err,result)
    {
        if(err){
            res.send("something went wrong")
        }
       if(result){
        const token = jwt.sign({userId:user._id}, process.env.PRIVATE_KEY);
        res.send({"msg":"login Successful", token:token})
       }
      else{
        res.send({"msg":"invalid data"})
      }
    })
})


module.exports = {userController}
