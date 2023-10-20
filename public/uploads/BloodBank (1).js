import express from "express";
const router = express.Router();
router.use(express.static('public'));
import { blood_bank_AddController,update_Controller,add_inventory_Controller,update_bloodbankController,getlocationController} from "../controller/bloodbankController.js";

router.get('/blood_bank_registration',(req,res)=>{
    res.render('pages/blood_bank_registration',{msg:""});
});
// router.get('/blood_bank_login/:role',(req,res)=>{
//     var role=req.params.role
//     res.render('pages/user_login',{email:"",pass:"",role:role});
// });
router.get('/blood_bank_profile',(req,res)=>{
    res.render('pages/blood_bank_profile');
});
router.get('/blood_inventory/:email',update_bloodbankController);
    // var email=req.params.email;
    // res.render('pages/blood_inventory',{email:email});



  

router.post('/bloodBank_reg', blood_bank_AddController);
//module.exports=router;
router.post('/updatedata', update_Controller);
router.post('/Addbloodunit/:email',add_inventory_Controller);
router.get('/getlocation',getlocationController);


export default router;