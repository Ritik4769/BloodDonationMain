import mongoose from "mongoose";

// Defining Schema
const registrationSchema = new mongoose.Schema({
<<<<<<< HEAD
   bloodBankname:{type:String,required:true,trim:true},
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

});
const Registration = mongoose.model("registrations",registrationSchema);
=======
   bloodBankname: {
      type: String,
      required: true,
      trim: true
   },
   ownerNamename: {
      type: String,
      required: true,
      trim: true
   },
   bloodBankCategory: {
      type: String,
      required: true,
      trim: true
   },
   licenseNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true
   },
   parentHospital: {
      type: String,
      trim: true
   },
   openingTime: {
      type: String,
      required: true,
      trim: true
   },
   closingTime: {
      type: String,
      required: true,
      trim: true
   },
   bloodBankEmail: {
      type: String,
      required: true,
      trim: true
   },
   password: {
      type: String,
      required: true,
      trim: true
   },
   ownerContactNo: {
      type: String,
      required: true,
      trim: true
   },
   bloodBankAddress: {
      type: String,
      required: true
   },
   city: {
      type
         : String,
      required: true,
      trim: true
   },
   state: {
      type: String,
      required: true,
      trim: true
   },
   zipcode: {
      type: String,
      required: true,
      trim: true
   },
   role:{
      type:String,
      require:true
  }

});
const Registration = mongoose.model("registrations", registrationSchema);
>>>>>>> e5182a55fa75377ae5ad85b9a989111fd8ca8ac4

export default Registration;
