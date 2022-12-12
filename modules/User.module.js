const mongoose = require("mongoose");

const userSchema= new mongoose.Schema({
    user_id:{
        type:Number
    },
    email :{
        type:String, require:true
    },
    password :{
        type:String, require:true
    },
    IP:{
        type:String
    }
})

const UserModule = mongoose.model("user", userSchema)

module.exports = {UserModule}