import mongoose from "mongoose";
const organization=mongoose.Schema({
    OrganizationName:{
        type:String,
        required:true,
        trim:true
    },
    OrganizerName:{
        type:String,
        required:true,
        trim:true
    },
    ContactNumber:{
        type:Number,
        required:true,
        trim:true
    },
    Email:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    City:{
        type:String,
        required:true
    },
    State:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    review:{
        type:String
    }
});
export const organization1=mongoose.model("organization",organization);
var campdataschema=mongoose.Schema({
    org_id:String,
    campName:String,
    personName:String,
    Contact:Number,
    Date:String,
    startTime:String,
    endTime:String,
    days:String,
    Address:String,
    City:String,
    State:String,
    Status:{
        type:String,
        default:"Pending"
    },
    unit:{
        type:Number,
        default:0
    }
});

export const camp1=mongoose.model("campmodel",campdataschema);