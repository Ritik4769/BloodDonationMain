import express from 'express';
import {verifyemail,verifyotp,appDataController,update_Controller,bloodRequestController,userSeeReportController,searchblood,blood_search,userprofile} from '../controller/usercontroller.js';
import  {jwt,SECRET_KEY}  from '../controller/logincontroller.js';
import {upload} from '../middleware/upload.js';
var router=express.Router();
router.use(express.static('public'));
router.get('/user_registration',(req,res)=>{
    res.render('pages/user_registration',{userdata:"",email:"",otp:"",wrongotp:""});
});
router.get('/login/:role',(req,res)=>{
    var role=req.params.role;
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
                    console.log("user");
                    res.render("pages/user_profile",{user:decodedToken.user.data,msg1:""});
                }
                else {
                    res.render("pages/user_login",{email:"",pass:"",role:role});
                }
            }
        });
    } else {
         res.render("pages/user_login",{email:"",pass:"",role:role});
    }
});
router.get("/logout")
router.get('/appointment/:id',(req,res)=>{
    var id=req.params.id;
    res.render("pages/appointment",{id:id,successMessages:"",decline:""});
});
router.get('/blood_request/:id',(req,res)=>{
    var id=req.params.id;
    res.render('pages/blood_request',{id:id});
});

router.post('/blood_request',upload,bloodRequestController);
router.post("/updatedata",update_Controller);
router.post("/appointment",appDataController);
router.post('/sendOtp',verifyemail);
router.post('/verifyotp',verifyotp);
router.get('/seereport/:id',userSeeReportController);
router.get('/searchblood',searchblood);
router.get('/blood_bank_search',blood_search);
router.get('/user_profile/:id',userprofile);
 export default router;