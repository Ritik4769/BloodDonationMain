import {blood_bank_inventory} from "../model/adminBloodinventory.js";
import {Add_blood_Unit,admin} from '../model/adminmodel.js';
import {usermodel,bloodReqModel,appDataModel} from '../model/usermodel.js';
import {camp1,organization1} from '../model/organizationmodel.js';
import Registration from '../model/blood_bankregistration.js';
import {mailer} from './mailer.js';
import bcrypt from 'bcrypt';
import randomstring from 'randomstring';
var otp="";
export const adminViewBloodInventory = async (req,res)=>{
    console.log("admin view blood controller");
    try {
        const result = await blood_bank_inventory.find({email:"dabidipesh7898@gmail.com"});
        console.log(result);
        res.render("pages/admin_blood_inventory",{userrecord:result,msg:"No blood unit is experied"});
    } catch (error) {
     
    }
}
export const adminlogin=async (req,res,next)=>{
    const {email,password}=req.body;
    try{
      let admindata= await admin.findOne({email:email});
      
      if(admindata){
        let pass=await bcrypt.compare(password,admindata.password);
        console.log('admin login',admindata);
        if(pass){          
          next();
        }
        else{
          res.render("pages/admin_login",{email:"",pass:"password not matched",msg:"",otp:""})
        }
      }
      else{
        res.render("pages/admin_login",{email:"email not found",pass:"",msg:"",otp:""});
      }
    } 
    catch(error){
      console.log('error : ',error);
    }   
}
export const verifyemail=async(req,res)=>{
  const {email}=req.body;
  try{
    console.log('verifyemail');
    const admin1=await admin.findOne({email:email});
    var blood_record=await blood_bank_inventory.findOne({email:email});
    if(admin1){
      otp=randomstring.generate({
        length:4,
        charset:'numeric'
      });
      var message=`Hello <b>${email}</b> <br> Your One Time Password is ${otp} enter this otp to verify email<br>Thank You 😊`;
      mailer(email,message,async(info)=>{
        if(info){          
          res.render("pages/admin_login",{email:"",pass:"",msg:"otp sent",otp:"sent"});
        }
        res.render("pages/admin_login",{email:"email not sent try again",pass:"",msg:"",otp:""});
      })       
    } 
    else{
      res.render("pages/admin_login",{email:"please entered registered email address for forgot password",pass:"",msg:"",otp:""});
    }
  }catch(error){
    console.log('error',error);
  }
}

export const verifyotp=async(req,res)=>{
     const {admin_otp}=req.body;
     if(otp==admin_otp){
      res.render("pages/admin_login",{email:"please entered registered email address for forgot password",pass:"",msg:"matched",otp:""});
     }
     else{
      res.render("pages/admin_login",{email:"otp not matched try again",pass:"",msg:"",otp:""});
     }
}
export const updatepassword=async(req,res)=>{
  const {password}=req.body;
  try{
    var hashpassword=await bcrypt.hash(password,10);
    await admin.updateOne({email:"dabidipesh7898@gmail.com"},{$set:{
      password:hashpassword
    }});
    res.render("pages/admin_login",{email:"",pass:"",msg:"",otp:""});
  }
  catch(error){
    console.log('error');
  }
}

export const Addbloodunitcontroller = async (req,res,next) => {
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
         var updateResult = await blood_bank_inventory.updateOne({email:"dabidipesh7898@gmail.com"}, {$inc: {A_plus_unit: bloodUnitValue }});
    } 
    else if(req.body.Blood_Type == "B_plus_unit") {
      var updateResult = await blood_bank_inventory.updateOne({email:"dabidipesh7898@gmail.com"}, {$inc: {B_plus_unit: bloodUnitValue }});
    }
    else if(req.body.Blood_Type == "AB_plus_unit") {
      var updateResult = await blood_bank_inventory.updateOne({email:"dabidipesh7898@gmail.com"}, {$inc: {AB_plus_unit: bloodUnitValue }});
    }
    else if(req.body.Blood_Type == "O_plus_unit") {
      var updateResult = await blood_bank_inventory.updateOne({email:"dabidipesh7898@gmail.com"}, {$inc: {O_plus_unit: bloodUnitValue }});
    }
    else if(req.body.Blood_Type == "O_minus_unit") {
      var updateResult = await blood_bank_inventory.updateOne({email:"dabidipesh7898@gmail.com"}, {$inc: {O_minus_unit: bloodUnitValue }});
    }
    else if(req.body.Blood_Type == "A_minus_unit") {
      var updateResult = await blood_bank_inventory.updateOne({email:"dabidipesh7898@gmail.com"}, {$inc: {A_minus_unit: bloodUnitValue }})
    }
    else if(req.body.Blood_Type == "B_minus_unit") {
      var updateResult = await blood_bank_inventory.updateOne({email:"dabidipesh7898@gmail.com"}, {$inc: {B_minus_unit: bloodUnitValue }})
    }
    else if(req.body.Blood_Type == "AB_minus_unit") {
      var updateResult = await blood_bank_inventory.updateOne({email:"dabidipesh7898@gmail.com"}, {$inc: {AB_minus_unit: bloodUnitValue }})
    }
    next();
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
      var existingUser = await appDataModel.find({status:false});
      console.log('');
      if(existingUser){
      for(var i=0;i<existingUser.length;i++){
         var data=await usermodel.findOne({_id:existingUser[i].user_id});
         console.log(data.name);
         existingUser[i].name=data.name;
         existingUser[i].email=data.email;
      }
      res.render("pages/admin_appointment_detail",{existingUser:existingUser});
    }
    else{
      res.render("pages/admin_appointment_detail",{existingUser:""});
    }
  }catch(err)
  {
      console.log(err);
  }   
}
export const donateddonor=async(req,res)=>{
  try{      
    console.log("hey there");
    var existingUser = await appDataModel.find({status:true});
    console.log('');
    if(existingUser){
    for(var i=0;i<existingUser.length;i++){
       var data=await usermodel.findOne({_id:existingUser[i].user_id});
       console.log(data.name);
       existingUser[i].name=data.name;
       existingUser[i].email=data.email;
    }
    res.render("pages/admin_donor_donated",{existingUser:existingUser});
  }
  else{
    res.render("pages/admin_appointment_detail",{existingUser:""});
  }
}catch(err)
{
    console.log(err);
}   
}
export const adminRecipientController = async(req,res)=>{
  try{
      console.log("hey there");
      var existingUser = await bloodReqModel.find({status:"Pending"});
      console.log(existingUser);
      for(var i=0;i<existingUser.length;i++){
         var data=await usermodel.findOne({_id:existingUser[i].user_id});
         console.log(data.name);
         existingUser[i].name=data.name;
         existingUser[i].email=data.email;
      }
      console.log('');
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
export const admindonorReportController = async(req,res,next)=>{
  try{
    
    var img;
   const {_id,report} = req.body;
   console.log("Id:",_id);
   console.log("report "+req.file.filename);
   var existingUser1 = await appDataModel.findOne({_id:_id});
   console.log('Image ',existingUser1);
   img=[existingUser1.reportImg];
   console.log(existingUser1.reportImg[0]);
   console.log(img);
   if(img.length==0)
   {
      img=[req.file.filename];
      var exist = await appDataModel.updateOne({_id:_id},{$set:{reportImg:img}});
   }
   else{
      console.log('null');
      img=existingUser1.reportImg;
      console.log(img);   
      img.push(req.file.filename);
      var exist = await appDataModel.updateOne({_id:_id},{$set:{reportImg:img}});
   }

   next();
  }catch(err){
      console.log(err);
  }
}
export const adminSeeReportController = async(req,res)=>{
  console.log("page render successfully")
  var _id = req.params._id;
  console.log("email1 :",_id);
  var data = await appDataModel.findOne({_id:_id});
  console.log(data);
  var donorreport = data.reportImg;
  console.log(donorreport);
  res.render("pages/admin_see_report",{_id:_id,donorreport:data.reportImg});
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

export const adminviewcampdetailsController = async(req,res)=>{
  try{
    var  today=new Date(); 
    var year=today.getFullYear();
    var month=today.getMonth()+1;
    var day=today.getDate();
    var date= `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      console.log("hey there");
      var campdata = await camp1.aggregate([
        {
          $match: {
            $and: [
              { Date: { $gte: date} }, // Filter where Date is greater than or equal to today's date
              { Status: "Pending" } // Filter where Status is "Pending"
            ]
          }
        }
      ]);
      console.log('campdata : ',campdata);
      if(campdata.length>0){ 
        for(var i=0;i<campdata.length;i++){
          let data=await organization1.findOne({_id:campdata[i].org_id});
          campdata[i].OrganizationName=data.OrganizationName;
          campdata[i].OrganizerName=data.OrganizerName;
        }       
        console.log("camp data ",campdata);
        res.render("pages/admin_camp_request",{campdetail:campdata});
      }
      else{
        res.render("pages/admin_camp_request",{campdetail:""});
      }
  }catch(err)
  {
    console.log(err);
  } 
}
export const viewacceptcampdetail=async(req,res)=>{
  try{
    var  today=new Date(); 
    var year=today.getFullYear();
    var month=today.getMonth()+1;
    var day=today.getDate();
    var date= `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      console.log("hey there");
      var campdata = await camp1.aggregate([
        {
          $match: {
            $and: [
              { Date: { $gte: date} }, // Filter where Date is greater than or equal to today's date
              { Status: "Accept" } // Filter where Status is "Pending"
            ]
          }
        }
      ]);
      console.log('campdata : ',campdata);
      if(campdata.length>0){ 
        for(var i=0;i<campdata.length;i++){
          let data=await organization1.findOne({_id:campdata[i].org_id});
          campdata[i].OrganizationName=data.OrganizationName;
          campdata[i].OrganizerName=data.OrganizerName;
        }       
        console.log("camp data ",campdata);
        res.render("pages/admin_accept_camp",{campdetail:campdata});
      }
      else{
        res.render("pages/admin_accept_camp",{campdetail:""});
      }
  }catch(err)
  {
    console.log(err);
  } 
}
export const adminAcceptRequestController = async(req,res,next)=>{
  var _id = req.params._id;
  var name = req.params.name;
  var email =req.params.email;
  console.log("id:",_id);
  console.log("name:",name);
  console.log("name:",email);
  
    var otp=randomstring.generate({
       length:4,
       charset:'numeric'
     });
     console.log('otp',otp);
     var message=`Hello ${name}<br>Your request for blood is accept.<br><br>Your Id  is_${otp} please take this id with you <br>Thank You 😊`;
     var exist = await  bloodReqModel.updateOne({_id:_id},{$set:{otp:otp,status:"Accepted"}});
     
     mailer(email,message,(info)=>{
      if(info){
        console.log('info ',info);
         next();
      }
     });
}

export const adminAcceptReqFormController = async(req,res)=>{
  try{
      const {reqid} = req.body;
      console.log("dfvbjytredsa",reqid);
      var existingUser = await bloodReqModel.findOne({otp:reqid});
      var user=await usermodel.findOne({_id:existingUser.user_id});
      var name=user.name;
      var email=user.email;
      existingUser.name=name;
      existingUser.email=email;
      existingUser.contact=user.mobile;
     console.log(existingUser);
     res.render("pages/admin_accept_request",{existingUser:existingUser,otp:"",msg:""});
  }catch(err){
      console.log(err)
  }
}

export const adminSuccessfulController = async(req,res)=>{
  try{
      var {otp,bloodgroup,unit}= req.body;
      console.log("otp of recipient "+otp);     
      
      console.log(otp);
      var blood_inventory=await blood_bank_inventory.findOne({email:"dabidipesh7898@gmail.com"});
      if(bloodgroup==="A_plus_unit" && blood_inventory.A_plus_unit>=unit){
         blood_inventory.A_plus_unit-=unit;
         await blood_bank_inventory.updateOne({email:"dabidipesh7898@gmail.com"},{$set:{
          A_plus_unit:blood_inventory.A_plus_unit
         }});
      }
      else if(bloodgroup==="A_minus_unit" && blood_inventory.A_minus_unit>=unit){
        blood_inventory.A_minus_unit-=unit;
         await blood_bank_inventory.updateOne({email:"dabidipesh7898@gmail.com"},{$set:{
          A_minus_unit:blood_inventory.A_minus_unit
         }});
      }
      else if(bloodgroup==="B_minus_unit" && blood_inventory.B_minus_unit>=unit){
        blood_inventory.B_minus_unit-=unit;
         await blood_bank_inventory.updateOne({email:"dabidipesh7898@gmail.com"},{$set:{
          B_minus_unit:blood_inventory.B_minus_unit
         }});
      }
      else if(bloodgroup==="B_plus_unit" && blood_inventory.B_plus_unit>=unit){
        blood_inventory.B_plus_unit-=unit;
         await blood_bank_inventory.updateOne({email:"dabidipesh7898@gmail.com"},{$set:{
          B_plus_unit:blood_inventory.B_plus_unit
         }});
      }
      else if(bloodgroup==="AB_plus_unit" && blood_inventory.AB_plus_unit>=unit){
        blood_inventory.AB_plus_unit-=unit;
         await blood_bank_inventory.updateOne({email:"dabidipesh7898@gmail.com"},{$set:{
          AB_plus_unit:blood_inventory.AB_plus_unit
         }});
      }
      else if(bloodgroup==="AB_minus_unit" && blood_inventory.AB_minus_unit>=unit){
        blood_inventory.AB_minus_unit-=unit;
         await blood_bank_inventory.updateOne({email:"dabidipesh7898@gmail.com"},{$set:{
          AB_minus_unit:blood_inventory.AB_minus_unit
         }});
      }
      else if(bloodgroup==="O_minus_unit" && blood_inventory.O_minus_unit>=unit){
        blood_inventory.O_minus_unit-=unit;
         await blood_bank_inventory.updateOne({email:"dabidipesh7898@gmail.com"},{$set:{
          O_minus_unit:blood_inventory.O_minus_unit
         }});
      }
      else if(bloodgroup==="O_plus_unit" && blood_inventory.O_plus_unit>=unit){
        blood_inventory.O_plus_unit-=unit;
         await blood_bank_inventory.updateOne({email:"dabidipesh7898@gmail.com"},{$set:{
          O_plus_unit:blood_inventory.O_plus_unit
         }});
      }
      else{
        var existingUser1 = await bloodReqModel.findOne({otp:otp});
        var msg="Blood Unit not available";
        res.render("pages/admin_accept_request",{existingUser:existingUser1,otp:"",msg:msg});
      }
      var existingUser1 = await bloodReqModel.findOne({otp:otp});
      await bloodReqModel.updateOne({otp:otp},{$set:{unit:unit,bloodGroup:bloodgroup,otp:0}});
      var user=await usermodel.findOne({_id:existingUser1.user_id});
      existingUser1.name=user.name;
      existingUser1.email=user.email;
      existingUser1.contact=user.mobile;
      existingUser1.unit=unit;
      existingUser1.cost=300;
      existingUser1.totalprice=300*unit;
      console.log('price',existingUser1.totalprice);
      existingUser1.billprice=existingUser1.totalprice-(existingUser1.totalprice)*(30/100);
      console.log('total price ',existingUser1.billprice);  
      res.render("pages/recipient_bill",{existingUser:existingUser1});
      
  }catch(err){
      console.log(err);
  }
}

export const adminAproveController  = async(req,res,next)=>{
  try{
  console.log("page render successfully");
  var _id = req.params._id;
  await camp1.updateOne({_id:_id},{$set:{Status:"Accept"}});
  var campdata=await camp1.findOne({_id:_id});
  console.log('organisation : ',campdata);
  var org_data=await organization1.findOne({_id:campdata.org_id});
  console.log('organisation : ',org_data);
  var message=`Hello <b>${org_data.OrganizationName}</b><br>Your request for organising camp is accepted<br>Thank You 😊`;
  mailer(org_data.Email,message,(info)=>{
    if(info){
      console.log("_id:",_id);
      next();
    }
  });
  
  }catch(error){
    console.log('error',error);
  }
}

export const adminDeclineController = async(req,res,next)=>{
  console.log("page render successfully")
  var _id = req.params._id;
  // console.log("email:",email);
  console.log("email1 :",_id)
  await camp1.updateOne({_id:_id},{$set:{Status:"Denied"}});
  var org_id=await camp1.findOne({_id:_id},{org_id:1});
  console.log('organisation : ',org_id);
  var org_data=await organization1.findOne({_id:org_id});
  var message=`Hello <b>${org_data.OrganizationName}</b><br>Your request for organising camp is denied for date not available <br>Thank You 😊`;
  mailer(org_data.Email,message,(info)=>{
    if(info){
      console.log("_id:",_id);
      next();
    }
  });
}
export const addcampunit=async(req,res,next)=>{
  const {id,unit}=req.body;
  console.log("camp id : "+id);
  try{
    await camp1.updateOne({_id:id},{$set:{
      unit:unit,Status:"Complete"
    }});
    next();
  }catch(error){
    console.log('error',error);
  }
}
export const expirynotificationController=async (req,res)=>{
  try {    
    const currentDate = new Date();
    const sevenDaysFromNow = new Date(currentDate);
    sevenDaysFromNow.setDate(currentDate.getDate() + 7);
    const expiringBloodUnits = await Add_blood_Unit.find({
      Expiry_Date: { $gte: currentDate, $lte: sevenDaysFromNow }
    });
    console.log(expiringBloodUnits);
    res.render('pages/admin_expiry_notification',{expiringBloodUnits:expiringBloodUnits});
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
}

export const adminAcceptAppFormController = async(req,res)=>{
  try{
      const {appid} = req.body;
      console.log("dfvbjytredsa",appid);
      var existingUser = await appDataModel.findOne({otp:appid});
      await usermodel.updateOne({_id:existingUser.user_id},{$set:{last_donation_date:existingUser.appointment_date,donation_count:+1}});
      var userdata=await usermodel.findOne({_id:existingUser.user_id});
      existingUser.name=userdata.name;
      existingUser.email=userdata.email;
      existingUser.contact=userdata.mobile;
      console.log(existingUser);
      res.render("pages/admin_accept_appointment",{existingUser:existingUser,otp:"",msg:""});
  }catch(err){
      console.log(err);
  }
}

export const adminSuccessAppfulController = async(req,res,next)=>{
  try{
      var otp = req.params.otp;
      console.log(otp);
      var existingUser1 = await appDataModel.updateOne({otp:otp},{$set:{status:true,otp:0}});
      next();
  }catch(err){
      console.log(err);
  }
}

export const viewcompletecamp=async(req,res)=>{
     try{
          var campdetail=await camp1.find({Status:"Complete"});
          if(campdetail){
            for(var i=0;i<campdetail.length;i++){
              var org_data=await organization1.findOne({_id:campdetail[i].org_id});
              console.log('org data : ',org_data);
              campdetail[i].OrganizationName=org_data.OrganizationName;
              campdetail[i].OrganizerName=org_data.OrganizerName;
            }
          }
          res.render("pages/Completed_camp",{campdetail:campdetail});
     }catch(error){
          console.log('error',error);
     }
}