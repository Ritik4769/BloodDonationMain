import { times } from "async";
import { Timestamp } from "bson";
import mongoose from "mongoose";
var schema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    age:{
        type:Number,
        required:true,
        trim:true
    },
    gender:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    city:{
        type:String,
        required:true,
        trim:true
    },
    state:{
        type:String,
        required:true,
        trim:true
    },
    mobile:{
        type:Number,
        required:true,
        trim:true
    },
    bloodgroup:{
        type:String,
        trim:true
    },
    last_donation_date:{
        type:Date,
        trim:true
    },
    donation_count:{
        type:Number,
        trim:true
    },
    review:{
        type:String,
        default:"",
        trim:true
    }
});
export const usermodel=mongoose.model("user",schema);
var appDataSchema = mongoose.Schema({
    user_id:{
        type:String,
        trim:true
    },
    disease: {
        type:String,
        trim:true
    },
    time:{
        type:String,
        trim:true
    },
    appointment_date: {
        type:Date,
        trim:true
    },
    reportImg : [String],
    otp:{
        type:Number,
        trim:true
    },
    status:{
        type:Boolean,
        default:false,
        trim:true
    }
  });
export const appDataModel = mongoose.model("donorappointment",appDataSchema);
var bloodReqSchema = mongoose.Schema({
     user_id:{
        type:String,
        required:true,
        trim:true
     },
     patient_name:{
        type:String,
        required : true,
        trim:true
     },
     disease:{
        type:String,
        required:true,
        trim:true
     },
     bloodGroup:{
        type:String,
        required:true,
        trim:true
     },
     doctorPrescriptionImage:{
        type:String,
        required:true,
        trim:true
     },
     otp:{
        type:Number,
        trim:true
     },
     unit:{
        type:Number,
        trim:true
     },
     status:{
        type:String,
        default:"Pending",
        trim:true
     }
  });
export const bloodReqModel = mongoose.model("resipient",bloodReqSchema);