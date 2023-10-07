import mongoose from "mongoose";
const admin1=mongoose.Schema({
   email:{
    type:String,
    required:true
   },
   password:{
    type:String,
    required:true
   }
});
module.exports.admin=mongoose.model("admin",admin1);