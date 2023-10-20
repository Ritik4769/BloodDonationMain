<<<<<<< HEAD
import {organization1,camp1} from "../model/organizationmodel.js";
import bcrypt from 'bcrypt';
import {transporter} from '../model/emailmodel.js';
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
  const mailOptions = {
    from: 'dabidipesh7898@gmail.com',
    to: req.body.email,
    subject: `OTP is ${otp}`,
    text: `Hello ${req.body.name}\n your one time Password is ${otp} enter this opt and register yourself`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.render('pages/Organization_registration',{organization1:"",email:"email not exist",otp:"",wrongotp:""});
    } else {
      console.log(otp);
      res.render("pages/Organization_registration",{organization1:"",email:"",otp:"opt sent",wrongotp:""});
    }
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
       var data=await camp1.find({org_id:id});
       if(data.length==0){
       var doc = new camp1({
          org_id:id,
          campName:campName,
          personName:Personname,
          Contact: contact,
          Date: date,
          startTime:startTime,
          endTime:endTime,
          day:days,
          Address:Address,
          City:city,
          State:state         
       });       
       const result = await doc.save();
       const data = await organization1.findOne({_id:id});
       console.log(data);       
       res.render("pages/Organization_profile",{organization:data,msg:"request sent sucessfully"});
      }
      else{
        var data=await camp1.updateOne({org_id:id},{$set:{
          campName:campName,
          personName:Personname,
          Contact: contact,
          Date: date,
          startTime:startTime,
          endTime:endTime,
          day:days,
          Address:Address,
          City:city,
          State:state
        }});
        var org_data=await organization1.findOne({_id:id});
        res.render("pages/Organization_profile",{organization:org_data,msg:"request sent sucessfully"});
      }
  }
  catch(err)
  {
      console.log("error:"+err);
  }
}
export const Organization_profileupdate = async (req, res) => {
  try {
    const {organizationkname,Organizername,Contact,email,state,city} = req.body;

    // Here, you can assume there's only one organization record
    const updatedOrg = await organization1.updateOne({Email:email}, {$set:{
      OrganizationName:organizationkname,
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
=======
import {organization1} from "../model/organizationmodel.js";
import bcrypt from 'bcrypt';
export const orgegController = async (req,res)=>
{
try {
    console.log(req.body);
    const { OrganizationName, OrganizerName ,Contact ,email , password, city, state,description} = req.body;
    const existingUser = await organization1.findOne({Email:email});
    if(existingUser){
       res.render("pages/Organization_registration",{msg:"email already exist"});
    }
    var hashpassword=await bcrypt.hash(password,10);
    var doc = await organization1.create({
        OrganizationName:OrganizationName,
        OrganizerName:OrganizerName,
        ContactNumber:Contact,
        Email:email,
        Password:hashpassword,
        City:city,
        State:state,
        Description:description,
        role:"Camp"
  });    
   //   console.log(result);
     console.log("Data inserted Successfully");   
     res.render("pages/index1");
    
  } catch (error) {
    console.log("Error"+error);
  }
 
}
>>>>>>> e5182a55fa75377ae5ad85b9a989111fd8ca8ac4
