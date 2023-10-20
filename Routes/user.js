import express from 'express';
<<<<<<< HEAD
import {verifyemail,verifyotp,appDataController,update_Controller,bloodRequestController,userSeeReportController,searchblood} from '../controller/usercontroller.js';
import  {jwt,SECRET_KEY}  from '../controller/logincontroller.js';
var router=express.Router();
router.use(express.static('public'));
router.get('/user_registration',(req,res)=>{
    res.render('pages/user_registration',{userdata:"",email:"",otp:"",wrongotp:""});
});
router.get('/login/:role',(req,res)=>{
    var role=req.params.role;
=======
import { registercontroller } from '../controller/usercontroller.js';
import { jwt, SECRET_KEY } from '../controller/logincontroller.js';


var router = express.Router();
router.use(express.static('public'));
router.get('/user_registration', (req, res) => {
    res.render('pages/user_registration', { email: "", con: "" });
});
router.get('/user_login/:role', (req, res) => {
    var role = req.params.role;
    console.log("loooogggggvhbkjnj user");
>>>>>>> e5182a55fa75377ae5ad85b9a989111fd8ca8ac4
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, SECRET_KEY, (err, decodedToken) => {
            console.log(decodedToken);
            if (err) {
                console.log("err", err)
                res.render("pages/user_login", { email: "", pass: "", role: role });
            } else {
                console.log("else models user");
                if (decodedToken.user.role == "User") {
<<<<<<< HEAD
                    console.log("user");
                    res.render("pages/user_profile",{user:decodedToken.user.data,msg:""});
                }
                else {
                    res.render("pages/user_login",{email:"",pass:"",role:role});
=======
                    res.render("pages/user_profile", { user: decodedToken.user });
                }
                else {
                    res.render("pages/user_login", { email: "", pass: "", role: role });
>>>>>>> e5182a55fa75377ae5ad85b9a989111fd8ca8ac4
                }
            }
        });
    } else {
<<<<<<< HEAD
         res.render("pages/user_login",{email:"",pass:"",role:role});
    }
})
router.get('/appointment/:id',(req,res)=>{
    var id=req.params.id;
    res.render("pages/appointment",{id:id,successMessages:"",decline:""});
});
router.get('/blood_request/:id',(req,res)=>{
    var id=req.params.id;
    res.render('pages/blood_request',{id:id});
});
router.post('/blood_request',bloodRequestController);
router.post("/updatedata",update_Controller)
router.post("/appointment",appDataController);
router.post('/sendOtp',verifyemail);
router.post('/verifyotp',verifyotp);
router.get('/seereport/:id',userSeeReportController);
router.get('/searchblood',searchblood);
 export default router;
=======
        console.log("lll");
        res.render("pages/user_login", { email: "", pass: "", role: role });
    }

    // res.render('pages/user_login',{email:"",pass:"",role:role});
});
router.get('/appointment', (req, res) => {
    res.render('pages/appointment');
});
router.get('/blood_request', (req, res) => {
    res.render('pages/blood_request');
});
router.get('/edit_profile/:email');
router.post('/adddata', registercontroller);

export default router;
>>>>>>> e5182a55fa75377ae5ad85b9a989111fd8ca8ac4
