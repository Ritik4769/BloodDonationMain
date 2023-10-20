import Registration from "../model/blood_bankregistration.js";
<<<<<<< HEAD
import {blood_bank_inventory} from '../model/adminBloodinventory.js';
import bcrypt from 'bcrypt';
import {transporter} from '../model/emailmodel.js';
import randomstring from 'randomstring';
var blood_bank_data={};
var otp="";
export const blood_bank_AddController =async (req,res)=>{  
  if(otp==req.body.bankotp) {

  try {
    console.log("reqbodey",req.body);
    const {bloodBankname,ownerNamename,bloodBankCategory,licenseNumber,parentHospital,openingTime,closingTime,days,bloodBankEmail,password,ownerContactNo, bloodBankAddress,city, state,zipcode} = blood_bank_data;
    const exist=await Registration.findOne({bloodBankEmail:bloodBankEmail});
    if(exist){
      res.render("pages/blood_bank_registration",{email:"email allready exist",otp:"",wrongotp:""});
=======
import bcrypt from 'bcrypt';
export const blood_bank_AddController =async (req,res)=>{
   
  try {
    console.log("reqbodey",req.body);
    const {bloodBankname,ownerNamename,bloodBankCategory,licenseNumber,parentHospital,openingTime,closingTime,days,bloodBankEmail,password,ownerContactNo, bloodBankAddress,city, state,zipcode} = req.body
    const exist=await Registration.findOne({bloodBankEmail:bloodBankEmail});
    if(exist){
      res.render("pages/blood_bank_registration",{msg:"email aready exist"});
>>>>>>> e5182a55fa75377ae5ad85b9a989111fd8ca8ac4
    }
    else{
      const hashpassword=await bcrypt.hash(password,10);
      const newBloodBank=await Registration.create({
        bloodBankname:bloodBankname,
        ownerNamename:ownerNamename,
        bloodBankCategory: bloodBankCategory,
        licenseNumber: licenseNumber,
        parentHospital: parentHospital,
        openingTime:openingTime,
        closingTime:closingTime, 
        days:days,
        bloodBankEmail: bloodBankEmail,
        password:hashpassword,
        ownerContactNo:ownerContactNo,
        bloodBankAddress:bloodBankAddress,
        city:city,
        state: state,
<<<<<<< HEAD
        zipcode:zipcode
      });
      res.render("pages/blood_bank_profile",{bloodbank:newBloodBank});
=======
        zipcode:zipcode,
        role:"BloodBank"
      });
      res.render("pages/blood_bank_profile",{user:newBloodBank});
>>>>>>> e5182a55fa75377ae5ad85b9a989111fd8ca8ac4
    }   
    
  } catch (error) {
    console.log(error)
  }
<<<<<<< HEAD
 }else{
  res.render("pages/blood_bank_registration",{email:"",otp:"",wrongotp:"Wrong Otp Register Again"});
 }
}


export const verifyemail=async(req,res)=>{
  blood_bank_data=req.body;
  console.log("OTP controller Runned",blood_bank_data);
  otp=randomstring.generate({
    length:4,
    charset:'numeric',
  });
  const mailOptions = {
    from: 'dabidipesh7898@gmail.com',
    to: req.body.bloodBankEmail,
    subject: `OTP is ${otp}`,
    text: `Hello ${req.body.ownerNamename}\n your one time Password is ${otp} enter this opt and register yourself`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.render('pages/blood_bank_registration',{email:"email not exist",otp:"",wrongotp:""});
    } else {
      res.render("pages/blood_bank_registration",{email:"",otp:"opt sent",wrongotp:""});
    }
  });
}

export const ViewUserController = async (req,res)=>{
  try {
      const result = await Registration.find()
=======
 
}
export const ViewUserController = async (req,res)=>{
  try {
      const result = await BloodBankRegistration.find()
>>>>>>> e5182a55fa75377ae5ad85b9a989111fd8ca8ac4
      // console.log(result);
      res.render("viewuser",{userrecord:result});
  } catch (error) {
   
  }
}
<<<<<<< HEAD
export const update_Controller = async (req, res) => {
  console.log("hello");
  try {
    
    const result = await Registration.updateOne({ bloodBankEmail: req.body.email },{
      $set: {
        bloodBankname: req.body.bloodbankname,
        ownerNamename: req.body.Ownername,
        ownerContactNo: req.body.Ownercontact,
        bloodBankAddress:req.body.address,
        state: req.body.state,
        city: req.body.city
      }
    });
    console.log("Helloooo");
    console.log("result  ",result);
     const data= await Registration.findOne({ bloodBankEmail: req.body.email })
    res.render("pages/blood_bank_profile",{bloodbank:data});
  } catch (error) {
        console.log("Error occur   " +error);
  }
}

export const add_inventory_Controller = async (req, res) => {
  var email = req.params.email;
  console.log(email);
  console.log("add_inventory_controller");
  try {
    const {
      A_plus_unit,
      B_plus_unit,
      AB_plus_unit,
      O_plus_unit,
      A_minus_unit,
      AB_minus_unit,
      O_minus_unit,
      B_minus_unit,
    } = req.body;

    const existingRecord = await blood_bank_inventory.findOne({ email: email });

    if (existingRecord) {

      const result = await blood_bank_inventory.updateOne({ email: email },
        { $set:{
          A_plus_unit: A_plus_unit,
          B_plus_unit: B_plus_unit,
          AB_plus_unit: AB_plus_unit,
          O_plus_unit: O_plus_unit,
          A_minus_unit: A_minus_unit,
          AB_minus_unit: AB_minus_unit,
          O_minus_unit: O_minus_unit,
          B_minus_unit: B_minus_unit,
        }
    });

      console.log("Record updated:", +result);

      const data = await Registration.findOne({ bloodBankEmail: email })
      res.render("pages/blood_bank_profile", { bloodbank: data });
    } else {
      console.log("else");
      const result = await blood_bank_inventory.create({
        A_plus_unit: A_plus_unit,
        B_plus_unit: B_plus_unit,
        AB_plus_unit: AB_plus_unit,
        O_plus_unit: O_plus_unit,
        A_minus_unit: A_minus_unit,
        AB_minus_unit: AB_minus_unit,
        O_minus_unit: O_minus_unit,
        B_minus_unit: B_minus_unit,
        email: email
      });

      if (result) {
        console.log("New record created:", result);
        const data = await Registration.findOne({ bloodBankEmail: email });
        res.render("pages/blood_bank_profile", { bloodbank: data });
      } else {
        console.log("Error creating a new record.");
        // Handle the error or send a response to the client
      }
    }
  } catch (error) {
    console.log("Error adding/updating blood unit", error);
  }
};

export const update_bloodbankController = async (req, res,) => {
  var email = req.params.email;
  console.log(email);
  console.log("update_bloodbankController");
  try {
    const record = await blood_bank_inventory.findOne({ email: email });
    console.log(record);

    if (record) {
      res.render('pages/blood_inventory', { email: email, record: record });
    }
    else {
      res.render('pages/blood_inventory', { email: email, record:""});
    }
  } catch (error) {
    console.log("Error adding/updating blood unit", error);
  }
}
=======

>>>>>>> e5182a55fa75377ae5ad85b9a989111fd8ca8ac4


