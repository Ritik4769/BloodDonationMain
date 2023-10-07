import express from "express";
import {adminViewBloodInventory,adminlogin} from '../controller/admincontroller.js';
const router = express.Router();

router.use(express.static('public'))

router.get("/",(req,res)=>{
    res.render("pages/admin_login",{email:"",pass:""});
})
router.get('/admin_dashboard',(req,res)=>{
    res.render('pages/admin_dashboard');
});
router.post('/Addbloodunit');

router.get('/admin_donor_detail',(req,res)=>{
    res.render('pages/admin_donor_detail');
});
router.get('/admin_donor_report',(req,res)=>{
    res.render('pages/admin_donor_report');
});
router.get('/admin_camp_request',(req,res)=>{
    res.render('pages/admin_camp_request');
});
router.get('/admin_blood_inventory',adminViewBloodInventory);
// router.get('/admin_blood_inventory',(req,res)=>{
//     res.render('pages/admin_blood_inventory');
// });
router.get('/admin_upload_report',(req,res)=>{
    res.render('pages/admin_upload_report');
});
router.get('/admin_see_report',(req,res)=>{
    res.render('pages/admin_see_report');
});
router.post("/admin_login",adminlogin)
//module.exports=router;


export default router;