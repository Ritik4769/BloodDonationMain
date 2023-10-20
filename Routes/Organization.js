import express from 'express';
<<<<<<< HEAD
import {verifyemail,verifyotp,campRequestController,Organization_profileupdate} from '../controller/organizatincontroller.js';
//import { verifyemail } from '../controller/usercontroller.js';
import  {jwt,SECRET_KEY}  from '../controller/logincontroller.js';
=======
import { orgegController } from '../controller/organizatincontroller.js';
import { jwt, SECRET_KEY } from '../controller/logincontroller.js';


>>>>>>> e5182a55fa75377ae5ad85b9a989111fd8ca8ac4
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
<<<<<<< HEAD
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
=======
router.get('/contact_us', function (req, res) {
    res.render('pages/contact_us');
});
router.get('/Organization_registration', function (req, res) {
    res.render('pages/Organization_registration');
});
router.get('/Organization_login/:role', function (req, res) {
    var role = req.params.role;
    console.log("loooogggggvhbkjnj camp");
>>>>>>> e5182a55fa75377ae5ad85b9a989111fd8ca8ac4
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, SECRET_KEY, (err, decodedToken) => {
            console.log(decodedToken);
            if (err) {
                console.log("err", err)
                res.render("pages/user_login", { email: "", pass: "", role: role });
            } else {
<<<<<<< HEAD
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
    var token=req.cookies.jwt;
    console.log(token);
    token="";
    res.cookie("jwt",token);
    res.render("pages/index1");
})
=======
                console.log("else models");
                if (decodedToken.user.role == "Camp")
                    res.render("pages/index1");
                else
                    res.render("pages/user_login", { email: "", pass: "", role: role });

            }
        });
    } else {
        console.log("lll");
        res.render("pages/user_login", { email: "", pass: "", role: role });
    }
    // res.render('pages/user_login',{email:"",pass:"",role:role});
});
router.get('/Organization_profile', function (req, res) {
    res.render('pages/Organization_profile');
});
router.get('/edit_profile', function (req, res) {
    res.render('pages/edit_profile');
});
router.post("/register", orgegController);

>>>>>>> e5182a55fa75377ae5ad85b9a989111fd8ca8ac4
export default router;