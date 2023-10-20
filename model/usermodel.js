import { times } from "async";
import { Timestamp } from "bson";
import mongoose from "mongoose";
var schema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    bloodgroup:{
        type:String
    },
    last_donation_date:{
        type:Date
    },
    donation_count:{
        type:Number
    }
});
export const usermodel=mongoose.model("user",schema);
var appDataSchema = mongoose.Schema({
    user_id:String,
    disease: String,
    time:String,
    appointment_date: Date,
    reportImg : [String]
  });
export const appDataModel = mongoose.model("donorappointment",appDataSchema);
var bloodReqSchema = mongoose.Schema({
     user_id:String,
     patient_name:{
     type:String,
     required : true
    },
    disease:String,
    bloodGroup:String,
    dr_Prescription:String,
    status:{
        type:String,
        default:"Pending"
    },
    otp:{
        type:Number
    }
  }) ;
export const bloodReqModel = mongoose.model("resipient",bloodReqSchema);