import { usermodel } from '../model/usermodel.js';
import { organization1 } from "../model/organizationmodel.js";
import Registration from "../model/blood_bankregistration.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import {mailer} from './mailer.js';
import randomstring from 'randomstring';
const maxAge = 3 * 24 * 60 * 60;
const SECRET_KEY = "crypto.randomBytes(32).toString('hex')";
let token;
let user={};
let otp="";
const logincontroller = async (req, res) => {
    const {email, password, role} = req.body;
    console.log('email '+email);
    try {
        const payload = {};
        const expiryTime = {
            expiresIn: '1d'
        }
        if (role == "user") {
            console.log('userlogin');
            const exist = await usermodel.findOne({ email: email });
            if (exist) {
                const pass = await bcrypt.compare(password, exist.password);
                if (pass) {
                    user={
                        data:exist,
                        role:"User"
                    }
                    payload.user = user;
                    
                    console.log(payload.user);
                    token = jwt.sign(payload, SECRET_KEY, expiryTime);
                    res.cookie('jwt', token , { httpOnly: true, maxAge: maxAge });
                    res.redirect("user_profile");
                } else {
                    res.render("pages/user_login", { email: "", pass: "password not matched", role: role });
                }
            }
            else {
                res.render("pages/user_login", { email: "email not found", pass: "", role: role });
            }
        }
        else if (role == "bank") {
            console.log('banklogin');
            const exist = await Registration.findOne({ bloodBankEmail: email });
            
            if (exist) {
                const pass = await bcrypt.compare(password, exist.password);
                if (pass) {
                    user={
                        data:exist,
                        role:"BloodBank"
                    }
                    payload.user=user;
                    console.log(payload.user);
                    token = jwt.sign(payload, SECRET_KEY, expiryTime);
                    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });
                    res.redirect("user_profile");
                } else {
                    res.render("pages/user_login", { email: "", pass: "password not matched", role: role });
                }
            }
            else {
                res.render("pages/user_login", { email: "email not found", pass: "", role: role });
            }
        }
        else if (role=="camp") {
            console.log('orglogin');
            const exist = await organization1.findOne({Email: email });
            if (exist) {
                const pass = await bcrypt.compare(password, exist.Password);
                if (pass) {
                    user={
                        data:exist,
                        role:"Camp"
                    }
                    payload.user=user;
                    console.log(payload.user);
                    token = jwt.sign(payload, SECRET_KEY, expiryTime);
                    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });
                    res.redirect("user_profile");
                } else {
                    res.render("pages/user_login", { email: "", pass: "password not matched", role: role });
                }
            }
            else {
                res.render("pages/user_login", { email: "email not found", pass: "", role: role });
            }
        }
    } catch (err) {
        console.log('error', err);
    }
}

const authenticateJWT = (request,response,next) => {
    console.log("authenticateJWT : ");
    const token = request.cookies.jwt;
    if (!token) {
        response.json({ message: "Error Occured while dealing with Token inside authenticateJWT" });
    }
    jwt.verify(token,SECRET_KEY,(err, payload)=>{
        if (err)
            response.json({ message: "Error Occured while dealing with Token during verify" });
        request.payload = payload;
        next();
    });
}
const authorizeUser = (request,response,next) => {
    console.log("authorizeUser : ");
    console.log(request.payload.user.data)
    if (request.payload.user.role == "User") {
        console.log(request.payload.user.role);
        response.render("pages/user_profile", {user:request.payload.user.data,msg1:""});
    } else if (request.payload.user.role == "BloodBank") {
        console.log(request.payload.user.role);
        console.log("blood....");
        response.render("pages/blood_bank_profile", {bloodbank:request.payload.user.data});
    } else {
        console.log(request.payload.user.role);
        console.log("camppppp")
        response.render("pages/Organization_profile",{organization:request.payload.user.data,msg:""});
    }
    next();
}
export const emailverify=async (req,res)=>{
    const {email,role}=req.body;
    if(role=="user"){
        try{
            const user=await usermodel.findOne({email:email});
            if(user){
                otp=randomstring.generate({
                    length:4,
                    charset:'numeric',
                  });
                  var message=`Hello <b>${user.name}</b><br>Your One Time Password is ${otp} enter this otp and Verify Email<br>Thank You 😊`;
                  mailer(user.email,message,(info)=>{
                    if(info){
                        res.render("pages/update_password",{email:req.body.email,otp:"opt sent",wrongotp:"",role:role});
                    }
                    else{
                        res.render('pages/user_login',{email:"email not sent",pass:"",role:role});   
                    }
                  });
                //   const mailOptions = {
                //     from: 'dabidipesh7898@gmail.com',
                //     to: req.body.email,
                //     subject: `OTP is ${otp}`,
                //     text: `Hello ${req.body.name}\n your one time Password is ${otp} enter this opt and register yourself`
                //   };
                //   transporter.sendMail(mailOptions, (error, info) => {
                //     if (error) {
                //       console.error(error);
                //       res.render('pages/user_login',{email:"email not exist",pass:"",role:role});
                //     } else {
                //       res.render("pages/update_password",{email:req.body.email,otp:"opt sent",wrongotp:"",role:role});
                //     }
                //   });
            }
            else{
                res.render("pages/user_login",{email:"email not found",pass:"",role:role});
            }
        }catch(err){

        }
    }
    else if(role=="bank")
    {
        try{
            const user=await Registration.findOne({bloodBankEmail:email});
            if(user){
                  otp=randomstring.generate({
                    length:4,
                    charset:'numeric',
                  });
                  var message=`Hello <b>${user.ownerNamename}</b><br>Your One Time Password is ${otp} enter this otp and register yourself<br>Thank You 😊`;
                  mailer(user.bloodBankEmail,message,(info)=>{
                    if(info){
                        res.render("pages/update_password",{email:req.body.email,otp:"opt sent",wrongotp:"",role:role});
                    }
                    else{
                        res.render('pages/user_login',{email:"email not sent",pass:"",role:role});   
                    }
                  });
                //   const mailOptions = {
                //     from: 'dabidipesh7898@gmail.com',
                //     to: req.body.email,
                //     subject: `OTP is ${otp}`,
                //     text: `Hello ${req.body.name}\n your one time Password is ${otp} enter this opt and register yourself`
                //   };
                //   transporter.sendMail(mailOptions, (error, info) => {
                //     if (error) {
                //       console.error(error);
                //       res.render('pages/user_login',{email:"email not exist",pass:"",role:role});
                //     } else {
                //       res.render("pages/update_password",{email:req.body.email,otp:"opt sent",wrongotp:"",role:role});
                //     }
                //   });
            }
            else{
                res.render("pages/user_login",{email:"email not found",pass:"",role:role});
            }
        }catch(err){

        }
    }
    else{
        try{
            const user=await organization1.findOne({Email:email});
            if(user){
                otp=randomstring.generate({
                    length:4,
                    charset:'numeric',
                  });
                  var message=`Hello <b>${user.OrganizerName}</b><br>Your One Time Password is ${otp} enter this otp and register yourself<br>Thank You 😊`;
                  mailer(user.Email,message,(info)=>{
                    if(info){
                        res.render("pages/update_password",{email:req.body.email,otp:"opt sent",wrongotp:"",role:role});
                    }
                    else{
                        res.render('pages/user_login',{email:"email not sent",pass:"",role:role});   
                    }
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
                      res.render('pages/user_login',{email:"email not exist",pass:"",role:role});
                    } else {
                      res.render("pages/update_password",{email:req.body.email,otp:"opt sent",role:role});
                    }
                  });
            }
            else{
                res.render("pages/user_login",{email:"email not found",pass:"",role:role});
            }
        }catch(err){
              
        }   
    }
}
export const verifyotp=async (req,res)=>{
    const {email,userotp,role}=req.body;
    if(otp==userotp){
        res.render("pages/update_password",{email:email,otp:"",role:role});
    }
    else{
        res.render("pages/user_login",{email:"",pass:"",role:role})
    }
}
export const update_password=async(req,res)=>{
    const {email,password,role}=req.body;
    if(role=="user"){
        try{
            console.log('password : '+password);
           var hashpassword=await bcrypt.hash(password,1);
           var updatepass=await usermodel.updateOne({email:email},{$set:{
            password:hashpassword
           }}); 
           res.render("pages/user_login",{email:"",pass:"",role:role});
        }
        catch{
            console.log("error");
        }
    }
    else if(role=="bank"){
        try{
            var hashpassword=await bcrypt.hash(password,1);
            var updatepass=await Registration.updateOne({bloodBankEmail:email},{$set:{
             password:hashpassword
            }}); 
            res.render("pages/user_login",{email:"",pass:"",role:role});
         }
         catch{
             console.log("error");
         }
    }
    else{
        try{
            var hashpassword=await bcrypt.hash(password,1);
            var updatepass=await organization1.updateOne({Email:email},{$set:{
             Password:hashpassword
            }}); 
            res.render("pages/user_login",{email:"",pass:"",role:role});
         }
         catch{
             console.log("error");
         }
    }
}
export {logincontroller,authenticateJWT,authorizeUser,jwt,SECRET_KEY};