import mongoose from "mongoose";
const organization=mongoose.Schema({
    OrganizationName:{
        type:String,
        required:true
    },
    OrganizerName:{
        type:String,
        required:true
    },
    ContactNumber:{
        type:Number,
        required:true
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
    }
});
export const organization1=mongoose.model("organization",organization);