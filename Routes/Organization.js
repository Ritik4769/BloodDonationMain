import express from 'express';
import {verifyemail,verifyotp,campRequestController,Organization_profileupdate,org_reviewcontroller} from '../controller/organizatincontroller.js';
//import { verifyemail } from '../controller/usercontroller.js';
import  {jwt,SECRET_KEY}  from '../controller/logincontroller.js';
import { reviewcontroller } from '../controller/usercontroller.js';
const router = express.Router();
router.use(express.static('public'));
router.get('/', function (req, res) {
    res.render('pages/index1');
});
router.get('/index1', function (req, res) {
    res.render('pages/index1');
});
router.get('/about', function (req, res) {
    res.render('pages/about');
});
router.get('/Camp', function (req, res) {
    res.render('pages/Camp');
});
router.get('/contact_us',function(req,res){
    res.render('pages/contact_us');
});
router.get('/Organization_registration',function(req,res){
    res.render('pages/Organization_registration',{organization:"",email:"",otp:"",wrongotp:""});
});
// router.get('/login/:role',(req,res)=>{
//     var role=req.params.role;
//     res.render("pages/user_login",{email:"",pass:"",role:role});
// })
router.get('/login/:role',function(req,res){
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
                if (decodedToken.user.role == "Camp") {
                    console.log("user");
                    res.render("pages/Organization_profile",{organization:decodedToken.user.data,msg:""});
                }
                else {
                    res.render("pages/user_login",{email:"",pass:"",role:role});
                }
            }
        });
    } 
    else{
       res.render("pages/user_login",{email:"",pass:"",role:role});
    }
});
router.get('/Organization_profile',function(req,res){
    res.render('pages/Organization_profile');
});
router.get('/edit_profile',function(req,res){
    res.render('pages/edit_profile');
});
router.post("/sendotp",verifyemail);  
router.post("/verifyotp",verifyotp);
router.post("/camprequest",campRequestController);
router.post("/updatedata",Organization_profileupdate);
router.get("/logout/:email",(req,res)=>{
    // var token=req.cookies.jwt;
    // console.log(token);
    // token="";
    // res.cookie("jwt",token);
    res.cookie("jwt",'');
    res.render("pages/index1");
});
router.post('/review',org_reviewcontroller)
export default router;