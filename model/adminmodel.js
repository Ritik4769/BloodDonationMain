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
export const admin=mongoose.model("admin",admin1);
const Add_bloodSchema = new mongoose.Schema({
   Blood_Type:{
      type:String,
      required:true,
      trim:true
   },
   Blood_Unit:{
      type:Number,
      required:true,
      trim:true
   },
   Arrival_date: Date,
   Expiry_Date: Date   
});
export const Add_blood_Unit = mongoose.model("Add_blood_Unit",Add_bloodSchema);