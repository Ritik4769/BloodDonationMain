import express from "express";
import {verifyemail,blood_bank_AddController,update_Controller,add_inventory_Controller,update_bloodbankController,getlocationController,paymentdetailsController,successController} from "../controller/bloodbankController.js";
import  {jwt}  from '../controller/logincontroller.js';
const router = express.Router();
router.use(express.static('public'));

router.get('/blood_bank_registration',(req,res)=>{
    res.render('pages/blood_bank_registration',{blood_bank:"",email:"",otp:"",wrongotp:"",key:"",amount :""});
});
router.get('/login/:role',(req,res)=>{
    var role=req.params.role
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, SECRET_KEY, (err, decodedToken) => {
            console.log(decodedToken);
            if (err) {
                console.log("err", err)
                res.render("pages/user_login", { email: "", pass: "", role: role });
            } else {
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
router.get('/getlocation',getlocationController);
router.post('/payment',paymentdetailsController);
router.get('/success',successController);
//module.exports=router;

export default router;