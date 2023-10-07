import mongoose from "mongoose";
var connection=mongoose.connect('mongodb://127.0.0.1:27017/blood_bank').
then(()=>console.log('connection sucessful')).
catch((err)=>console.log('error',err));
export default connection;