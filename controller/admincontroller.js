import {blood_bank_inventory} from "../model/adminBloodinventory.js";
import {Add_blood_Unit} from '../model/adminmodel.js';
import {usermodel,bloodReqModel,appDataModel} from '../model/usermodel.js';
import {camp1,organization1} from '../model/organizationmodel.js';
import Registration from '../model/blood_bankregistration.js';
export const adminViewBloodInventory = async (req,res)=>{
    console.log("admin view blood controller");
    try {
        const result = await blood_bank_inventory.find({email:"admin@gmail.com"});
        console.log(result);
        res.render("pages/admin_blood_inventory",{userrecord:result});
    } catch (error) {
     
    }
}
export const adminlogin=async (req,res)=>{
    var {email,password}=req.body;
    if(email=="admin@gmail.com"){
        if(password="admin@123")
        {
            const result = await blood_bank_inventory.find({email:"admin@gmail.com"});
            console.log(result);
            res.render("pages/admin_blood_inventory",{userrecord:result});
        }    
        else
            res.render("pages/admin_login",{email:"",pass:"password not matched"});
    }else{
        res.render("pages/admin_login",{email:"email not matched",pass:""});   
    }
}
export const Addbloodunitcontroller = async (req, res) => {
  try {
    const { Blood_Type, Blood_Unit } = req.body;
    const currentDate = new Date();
    const expiryDate = new Date(currentDate);
    expiryDate.setDate(currentDate.getDate() + 42);

    const doc = new Add_blood_Unit({
      Blood_Type: Blood_Type,
      Blood_Unit: Blood_Unit,
      Arrival_date: currentDate,
      Expiry_Date: expiryDate,
    });

    console.log("Blood unit document created:", doc);

    const result = await doc.save();

    console.log("bloodtype:" + req.body.Blood_Type);
    console.log("bloodunit  " + req.body.Blood_Unit);
    const bloodUnitValue = parseInt(req.body.Blood_Unit, 10);
    console.log("type of  " + typeof req.body.Blood_Unit);

    if (req.body.Blood_Type == "A_plus_unit") {
         var updateResult = await blood_bank_inventory.updateOne({email:"admin@gmail.com"}, {$inc: {A_plus_unit: bloodUnitValue }});
         var data=await blood_bank_inventory.find({email:"admin@gmail.com"});
         console.log("bloodbank updated ");
         res.render("pages/admin_blood_inventory",{userrecord:data});

    } else if(req.body.Blood_Type == "B_plus_unit") {
      var updateResult = await blood_bank_inventory.updateOne({email:"admin@gmail.com"}, {$inc: {B_plus_unit: bloodUnitValue }})
      var data=await blood_bank_inventory.find({email:"admin@gmail.com"});
         console.log("bloodbank updated ");
         res.render("pages/admin_blood_inventory",{userrecord:data});

    }else if(req.body.Blood_Type == "AB_plus_unit") {
      var updateResult = await blood_bank_inventory.updateOne({email:"admin@gmail.com"}, {$inc: {AB_plus_unit: bloodUnitValue }})
      var data=await blood_bank_inventory.find({email:"admin@gmail.com"});
         console.log("bloodbank updated ");
         res.render("pages/admin_blood_inventory",{userrecord:data});

    }else if(req.body.Blood_Type == "O_plus_unit") {
      var updateResult = await blood_bank_inventory.updateOne({email:"admin@gmail.com"}, {$inc: {O_plus_unit: bloodUnitValue }})
      var data=await blood_bank_inventory.find({email:"admin@gmail.com"});
         console.log("bloodbank updated ");
         res.render("pages/admin_blood_inventory",{userrecord:data});
    }else if(req.body.Blood_Type == "O_minus_unit") {
      var updateResult = await blood_bank_inventory.updateOne({email:"admin@gmail.com"}, {$inc: {O_minus_unit: bloodUnitValue }})
      var data=await blood_bank_inventory.find({email:"admin@gmail.com"});
         console.log("bloodbank updated ");
         res.render("pages/admin_blood_inventory",{userrecord:data});
    }
    else if(req.body.Blood_Type == "A_minus_unit") {
      var updateResult = await blood_bank_inventory.updateOne({email:"admin@gmail.com"}, {$inc: {A_minus_unit: bloodUnitValue }})
      var data=await blood_bank_inventory.find({email:"admin@gmail.com"});
         console.log("bloodbank updated ");
         res.render("pages/admin_blood_inventory",{userrecord:data});
    }
    else if(req.body.Blood_Type == "B_minus_unit") {
      var updateResult = await blood_bank_inventory.updateOne({email:"admin@gmail.com"}, {$inc: {B_minus_unit: bloodUnitValue }})
      var data=await blood_bank_inventory.find({email:"admin@gmail.com"});
         console.log("bloodbank updated ");
         res.render("pages/admin_blood_inventory",{userrecord:data});
    }
    else if(req.body.Blood_Type == "AB_minus_unit") {
      var updateResult = await blood_bank_inventory.updateOne({email:"admin@gmail.com"}, {$inc: {AB_minus_unit: bloodUnitValue }})
      var data=await blood_bank_inventory.find({email:"admin@gmail.com"});
         console.log("bloodbank updated ");
         res.render("pages/admin_blood_inventory",{userrecord:data});
    }
    if (updateResult.modifiedCount === 0) {
      console.log("No matching document found for update.");
    } else {
      console.log("Blood inventory updated Successfully");
    }
  } catch (error) {
    console.error("Error adding blood unit:", error);
    res.status(500).json({ error: "Error adding blood unit" });
  }
};

export const adminUserController = async(req,res)=>{
    try{
        console.log("hey there");
        var existingUser = await usermodel.find();
        console.log(existingUser);
        if(existingUser.length==0){
            res.render("pages/admin_user_detail",{msg:"No User Found",existingUser:""});
        }
        res.render("pages/admin_user_detail",{msg:"",existingUser:existingUser});
    }catch(err)
    {
        console.log(err);
    }   
}
export const adminDonorController = async(req,res)=>{
  try{
      
      console.log("hey there");
      var existingUser = await appDataModel.find();
      console.log('');
      for(var i=0;i<existingUser.length;i++){
         var data=await usermodel.findOne({_id:existingUser[i].user_id});
         console.log(data.name);
         existingUser[i].name=data.name;
         existingUser[i].email=data.email;
      }
      console.log(existingUser[0].name);
      res.render("pages/admin_appointment_detail",{existingUser:existingUser});
  }catch(err)
  {
      console.log(err);
  }   
}

export const adminRecipientController = async(req,res)=>{
  try{
      console.log("hey there");
      var existingUser = await bloodReqModel.find();
      console.log(existingUser);
      // var userdata = await appDataModel.find();
      // console.log('');
      for(var i=0;i<existingUser.length;i++){
         var data=await usermodel.findOne({_id:existingUser[i].user_id});
         console.log(data.name);
         existingUser[i].name=data.name;
         existingUser[i].email=data.email;
      }
      res.render("pages/admin_recipient_detail",{existingUser:existingUser});
  }catch(err)
  {
      console.log(err);
  }   
}

export const adminUploadReportController = async(req,res)=>{
  console.log("page render successfully")
  var _id = req.params._id;
  console.log("_id:",_id);
  res.render("pages/admin_upload_report",{_id:_id});
}

export const admindonorReportController = async(req,res)=>{
  try{
    var img;
   const {_id,report} = req.body;
   console.log("Id:",_id);
   console.log("report "+req.file.filename);
   var existingUser1 = await appDataModel.findOne({_id:_id});
   img=[existingUser1.reportImg];
   console.log(existingUser1.reportImg[0]);
   console.log(img);
   if(img.length==0)
   {
      img=[req.file.filename];
      var exist = await appDataModel.updateOne({_id:_id},{$set:{reportImg:img}});
      // var existingUser = await appDataModel.find();
      // console.log(exist);
      var userdata = await appDataModel.find();
      console.log('');
      for(var i=0;i<userdata.length;i++){
         var data=await usermodel.findOne({_id:userdata[i].user_id});
         console.log(data.name);
         userdata[i].name=data.name;
         userdata[i].email=data.email;
      }
      res.render("pages/admin_appointment_detail",{existingUser:userdata});
   }
   else{
      console.log('null');
      img=existingUser1.reportImg;
      console.log(img);   
      img.push(req.file.filename);
      var exist = await appDataModel.updateOne({_id:_id},{$set:{reportImg:img}});
      var userdata = await appDataModel.find();
      console.log('');
      for(var i=0;i<userdata.length;i++){
         var data=await usermodel.findOne({_id:userdata[i].user_id});
         console.log(data.name);
         userdata[i].name=data.name;
         userdata[i].email=data.email;
      }
      res.render("pages/admin_appointment_detail",{existingUser:userdata});
   }
  }catch(err){
      console.log(err);
  }
}

export const adminSeeReportController = async(req,res)=>{
  console.log("page render successfully")
  var _id = req.params._id;
  // console.log("email:",email);
  console.log("email1 :",_id);
  var data = await appDataModel.find({_id:_id})
  console.log(data);
  var donorreport = data[0].reportImg;
  console.log(donorreport);
  res.render("pages/admin_see_report",{_id:_id,donorreport:data[0].reportImg});
}

export const admincamprequestController = async(req,res)=>{
  try{
      console.log("hey there");
      var existingUser = await camp1.find();
      console.log(existingUser);
      if(existingUser.length==0){
          res.render("pages/admin_camp_request",{msg:"No Request Found",existingUser:""});
      }
      res.render("pages/admin_camp_request",{msg:"",existingUser:existingUser});
  }catch(err)
  {
      console.log(err);
  }   
}
export const bloodbank=async(req,res)=>{
  try{
    var existingUser=await Registration.find();
    if(existingUser){
    res.render("pages/admin_blood_bank",{existingUser:existingUser,msg:""});
    }else{
      res.render("pages/admin_blood_bank",{existingUser:"",msg:"No Blood Bank Registered"});
    }
  }
  catch{

  }
}

export const admin_organization=async (req,res)=>{
  try{
    var existingUser=await organization1.find();
    if(existingUser){
      res.render("pages/admin_organization",{existingUser:existingUser,msg:""});
      }else{
        res.render("pages/admin_organization",{existingUser:"",msg:"No Blood Bank Registered"});
      }
  }
  catch{
    
  }
}