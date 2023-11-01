import mongoose from "mongoose";

// Defining Schema
const registrationSchema = new mongoose.Schema({
   bloodBankname:{
      type:String,
      required:true,
      trim:true
   },
   ownerNamename:{type:String,required:true,trim:true},
   bloodBankCategory:{type:String,required:true,trim:true},
   licenseNumber:{type:String,required:true,unique:true,trim:true},
   parentHospital:{type:String,trim:true},
   openingTime:{type:String,required:true,trim:true},
   closingTime:{type:String,required:true,trim:true},
   bloodBankEmail:{type:String,required:true,trim:true},
   password:{type:String,required:true,trim:true},
   ownerContactNo:{type:String,required:true,trim:true},
   bloodBankAddress:{type:String,required:true},
   city:{type:String,required:true,trim:true},
   state:{type:String,required:true,trim:true},
   zipcode:{type:String,required:true,trim:true},
   latitude:{type:String,required:true},
   longitude:{type:String,required:true},
   days:{type:String,required:true}
});
const Registration = mongoose.model("registrations",registrationSchema);

export default Registration;
