import express from "express";
<<<<<<< HEAD
import {verifyemail,blood_bank_AddController,update_Controller,add_inventory_Controller,update_bloodbankController} from "../controller/bloodbankController.js";
import  {jwt}  from '../controller/logincontroller.js';
const router = express.Router();
router.use(express.static('public'));

router.get('/blood_bank_registration',(req,res)=>{
    res.render('pages/blood_bank_registration',{email:"",otp:"",wrongotp:""});
});
router.get('/login/:role',(req,res)=>{
    var role=req.params.role
=======
import { blood_bank_AddController } from "../controller/bloodbankController.js";
import { jwt, SECRET_KEY } from '../controller/logincontroller.js';


const router = express.Router();
router.use(express.static('public'));
// router.get('/', function (req, res) {
//     res.render('pages/index1');
// });
// router.get('/index1', function (req, res) {
//     res.render('pages/index1');
// });
// router.get('/about', function (req, res) {
//     res.render('pages/about');
// });
// router.get('/Camp', function (req, res) {
//     res.render('pages/Camp');
// });
// router.get('/contact_us',function(req,res){
//     res.render('pages/contact_us');
// });
router.get('/blood_bank_registration', (req, res) => {
    res.render('pages/blood_bank_registration');
});
router.get('/blood_bank_login/:role', (req, res) => {

    var role = req.params.role
    console.log("loooogggggvhbkjnj blood bank");
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
                if (decodedToken.user.role == "BloodBank") {
                    console.log("user");
                    res.render("pages/blood_bank_profile",{bloodbank:decodedToken.user.data});
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
router.get('/blood_bank_profile',(req,res)=>{
    res.render('pages/blood_bank_profile');
});
// router.get('/blood_inventory/:email',(req,res)=>{
//     var email=req.params.email;
//     res.render('pages/blood_inventory',{email:email});
// });

router.post("/updatedata",update_Controller);
router.post('/verifyemail', verifyemail);
router.post('/verifyotp',blood_bank_AddController);
router.get('/blood_inventory/:email',update_bloodbankController);
router.post('/Addbloodunit/:email',add_inventory_Controller);
=======
                console.log("else models blood bank");
                if (decodedToken.user.role == "BloodBank")
                    res.render("pages/blood_bank_profile", { user: decodedToken.user });
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
router.get('/blood_bank_profile', (req, res) => {
    res.render('pages/blood_bank_profile');
});
router.get('/blood_inventory', (req, res) => {
    res.render('pages/blood_inventory');
});
router.post('/bloodBank_reg', blood_bank_AddController);
>>>>>>> e5182a55fa75377ae5ad85b9a989111fd8ca8ac4
//module.exports=router;

export default router;