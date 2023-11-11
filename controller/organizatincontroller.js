import {organization1,camp1} from "../model/organizationmodel.js";
import bcrypt from 'bcrypt';
import {mailer} from './mailer.js';
import randomstring from 'randomstring';
var orgdata={};
var otp="";
export const verifyemail=async(req,res)=>{
  orgdata=req.body;
  console.log("OTP controller Runned",orgdata);
  otp=randomstring.generate({
    length:4,
    charset:'numeric',
  });
  console.log('otp',otp);
  var message=`Hello <b>${req.body.OrganizationName}</b> <br>Your One time password is ${otp} enter the otp and register yourself in our Website<br>Thank You 😊`;
  var email = req.body.email;
  mailer(email,message,(info)=>{
    if(info){
      res.render("pages/Organization_registration",{organization1:"",email:"",otp:"opt sent",wrongotp:""});
    }
    res.render('pages/Organization_registration',{organization1:orgdata,email:"email not sent try again",otp:"",wrongotp:""});
  });
  
}
export const verifyotp=async(req,res)=>{
  var orgotp=req.body.orgotp;
  if(orgotp==otp){
    try {
      console.log(req.body);
      const existingUser = await organization1.findOne({Email:orgdata.email});
      if(existingUser){
         res.render("pages/Organization_registration",{msg:"email already exist"});
      }
      console.log(orgdata.email);
      var hashpassword=await bcrypt.hash(orgdata.password,10);
      var doc = await organization1.create({
          OrganizationName:orgdata.OrganizationName,
          OrganizerName:orgdata.OrganizerName,
          ContactNumber:orgdata.Contact,
          Email:orgdata.email,
          Password:hashpassword,
          City:orgdata.city,
          State:orgdata.state,
          Description:orgdata.description
    });    
     //   console.log(result);
       console.log("Data inserted Successfully");   
       res.render("pages/Organization_profile",{organization:doc,msg:""});
      
    } catch (error) {
      console.log("Error"+error);
    }
  }
  else{
    res.render("pages/Organization_registration",{organization1:"",email:"",otp:"",wrongotp:"You Enter Wrong Otp Please Register another time"});
  }
}
export const campRequestController = async(req,res)=>{
  try{
       const {id,campName,Personname,contact,date,startTime,endTime,days,Address,city,state} = req.body;
       console.log(req.body);
       console.log(days);
       var data=await camp1.find({org_id:id});
       if(data.length==0){
       var doc = await camp1.create({
          org_id:id,
          campName:campName,
          personName:Personname,
          Contact: contact,
          Date: date,
          startTime:startTime,
          endTime:endTime,
          days:days,
          Address:Address,
          City:city,
          State:state,
          unit:0         
       });       
       console.log(doc);
      //  const org_data = await organization1.findOne({_id:id});
       console.log(data);       
      }
      else{
        var data=await camp1.updateOne({org_id:id},{$set:{
          campName:campName,
          personName:Personname,
          Contact: contact,
          Date: date,
          startTime:startTime,
          endTime:endTime,
          days:days,
          Address:Address,
          City:city,
          State:state,
          Status:"Pending",
          unit:0
        }});
        console.log(data);        
        // console.log('org_data',org_data);     
      }
      var org_data=await organization1.findOne({_id:id});   
      res.render("pages/Organization_profile",{organization:org_data,msg:"request sent sucessfully"});
  }
  catch(err)
  {
      console.log("error:"+err);
  }
}
export const Organization_profileupdate = async (req, res) => {
  try {
    const {organizationname,Organizername,Contact,email,state,city} = req.body;
    // Here, you can assume there's only one organization record
    const updatedOrg = await organization1.updateOne({Email:email}, {$set:{
      OrganizationName:organizationname,
      OrganizerName:Organizername,
      ContactNumber:Contact,
      State:state,
      City:city
    }});
    const data=await organization1.findOne({Email:email});
    if (!updatedOrg) {
      return res.status(404).send('Organization not found.');
    }
    res.render("pages/Organization_profile",{organization:data,msg:"data updated"});
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};

export const org_reviewcontroller=async(req,res)=>{
  try{
     const {id,review}=req.body;
     await organization1.updateOne({_id:id},{$set:{
      review:review
     }});
     var data=await organization1.findOne({_id:id});
     res.render('pages/organization _profile',{organization:data,msg:""});
  }catch(error){
    console.log('error ',error);
  }
}