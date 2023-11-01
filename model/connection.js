import mongoose from "mongoose";
var connection=mongoose.connect('mongodb+srv://dabidipesh7898:iKcqQoiapIwuUn2U@cluster0.g2kxpbk.mongodb.net/test').
then(()=>console.log('connection sucessful')).
catch((err)=>console.log('error',err));
export default connection;