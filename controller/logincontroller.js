import { usermodel } from '../model/usermodel.js';
import { organization1 } from "../model/organizationmodel.js";
import Registration from "../model/blood_bankregistration.js";
import bcrypt from "bcrypt";
<<<<<<< HEAD
import jwt from 'jsonwebtoken';
import {transporter} from '../model/emailmodel.js';
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
=======
import crypto from 'crypto';
import jwt from "jsonwebtoken";
const maxAge = 3 * 24 * 60 * 60;
// const SECRET_KEY = crypto.randomBytes(32).toString('hex');
// const SECRET_KEY = crypto.randomBytes(32).toString('hex');
const SECRET_KEY = "crypto.randomBytes(32).toString('hex')";
let token;

const logincontroller = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        console.log("ffdfdfdfd");
>>>>>>> e5182a55fa75377ae5ad85b9a989111fd8ca8ac4
        const payload = {};
        const expiryTime = {
            expiresIn: '1d'
        }
        if (role == "user") {
<<<<<<< HEAD
            console.log('userlogin');
=======
>>>>>>> e5182a55fa75377ae5ad85b9a989111fd8ca8ac4
            const exist = await usermodel.findOne({ email: email });
            if (exist) {
                const pass = await bcrypt.compare(password, exist.password);
                if (pass) {
<<<<<<< HEAD
                    user={
                        data:exist,
                        role:"User"
                    }
                    payload.user = user;
                    console.log(payload.user);
                    token = jwt.sign(payload, SECRET_KEY, expiryTime);
                    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });
=======

                    payload.user = exist;
                    console.log(payload.user);
                    token = jwt.sign(payload, SECRET_KEY, expiryTime);
                    res.cookie('jwt', token, { httpOnly: true, maxAge: 86400*1000 });
>>>>>>> e5182a55fa75377ae5ad85b9a989111fd8ca8ac4
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
<<<<<<< HEAD
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
=======
            const exist = await Registration.findOne({ bloodBankEmail: email });

            if (exist) {

                const pass = await bcrypt.compare(password, exist.password);
                if (pass) {
                    payload.user = exist;
>>>>>>> e5182a55fa75377ae5ad85b9a989111fd8ca8ac4
                    console.log(payload.user);
                    token = jwt.sign(payload, SECRET_KEY, expiryTime);
                    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });
                    res.redirect("user_profile");
                } else {
<<<<<<< HEAD
                    res.render("pages/user_login", { email: "", pass: "password not matched", role: role });
=======
                    res.render("pages/user_login", { email: "", pass: "", role: role });
>>>>>>> e5182a55fa75377ae5ad85b9a989111fd8ca8ac4
                }
            }
            else {
                res.render("pages/user_login", { email: "email not found", pass: "", role: role });
            }
        }
<<<<<<< HEAD
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
=======
        else if (role == "camp") {
            console.log("camp")
            const exist = await organization1.findOne({ Email: email });
            if (exist) {
                console.log("camp1")

                const pass = await bcrypt.compare(password, exist.Password);
                if (pass) {
                    console.log("camp2")
                    payload.user = exist;
                    console.log(payload.user);
                    token = jwt.sign(payload, SECRET_KEY, expiryTime);
                    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });
                    // res.render("pages/blood_bank_profile", { bank: exist });
                    res.redirect("user_profile");

>>>>>>> e5182a55fa75377ae5ad85b9a989111fd8ca8ac4
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

<<<<<<< HEAD
const authenticateJWT = (request,response,next) => {
=======

const authenticateJWT = (request, response, next) => {
>>>>>>> e5182a55fa75377ae5ad85b9a989111fd8ca8ac4
    console.log("authenticateJWT : ");
    const token = request.cookies.jwt;
    if (!token) {
        response.json({ message: "Error Occured while dealing with Token inside authenticateJWT" });
    }
<<<<<<< HEAD
    jwt.verify(token,SECRET_KEY,(err, payload)=>{
=======
    jwt.verify(token, SECRET_KEY, (err, payload) => {
>>>>>>> e5182a55fa75377ae5ad85b9a989111fd8ca8ac4
        if (err)
            response.json({ message: "Error Occured while dealing with Token during verify" });
        request.payload = payload;
        next();
    });
}
<<<<<<< HEAD
const authorizeUser = (request,response,next) => {
    console.log("authorizeUser : ");
    console.log(request.payload.user.data)
    if (request.payload.user.role == "User") {
        console.log(request.payload.user.role);
        response.render("pages/user_profile", {user:request.payload.user.data,msg:""});
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
                      res.render("pages/update_password",{email:req.body.email,otp:"opt sent",wrongotp:"",role:role});
                    }
                  });
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
                      res.render("pages/update_password",{email:req.body.email,otp:"opt sent",wrongotp:"",role:role});
                    }
                  });
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
=======

const authorizeUser = (request, response, next) => {
    console.log("authorizeUser : ");
    console.log(request.payload.user)
    if (request.payload.user.role == "User") {
        response.render("pages/user_profile", { user: request.payload.user });
    } else if (request.payload.user.role == "BloodBank") {
        console.log("blood....");
        response.render("pages/blood_bank_profile", { user: request.payload.user });
    } else {
        console.log("camppppp")
        response.render("pages/index1");
    }
    next();
}

export { logincontroller, authenticateJWT, authorizeUser, jwt, SECRET_KEY };
>>>>>>> e5182a55fa75377ae5ad85b9a989111fd8ca8ac4
