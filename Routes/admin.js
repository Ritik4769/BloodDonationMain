import express from "express";
<<<<<<< HEAD
import {adminViewBloodInventory,adminlogin,adminUserController,Addbloodunitcontroller,adminDonorController,adminUploadReportController,adminSeeReportController,adminRecipientController,admindonorReportController,admincamprequestController,bloodbank,admin_organization} from '../controller/admincontroller.js';
import {upload2,upload} from '../middleware/upload.js';
=======
import {adminViewBloodInventory,adminlogin} from '../controller/admincontroller.js';
>>>>>>> e5182a55fa75377ae5ad85b9a989111fd8ca8ac4
const router = express.Router();

router.use(express.static('public'))

router.get("/",(req,res)=>{
    res.render("pages/admin_login",{email:"",pass:""});
})
router.get('/admin_dashboard',(req,res)=>{
    res.render('pages/admin_dashboard');
});
router.post('/Addbloodunit');

<<<<<<< HEAD
router.get('/admin_user_detail',adminUserController);
router.get('/admin_donor_detail',adminDonorController);
router.get('/blood_bank',bloodbank);
router.get("/admin_organization",admin_organization)
router.get('/admin_blood_inventory',adminViewBloodInventory);

router.get('/adminUploadReport/:_id',adminUploadReportController);
router.post('/donorReport/:_id',upload2,admindonorReportController);
router.get('/adminSeeReport/:_id',adminSeeReportController);
router.post("/admin_login",adminlogin);
router.post('/addunit',Addbloodunitcontroller);
router.get("/blood_request",adminRecipientController);
router.get("/admin_camp_request",admincamprequestController)
=======
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
>>>>>>> e5182a55fa75377ae5ad85b9a989111fd8ca8ac4
//module.exports=router;


export default router;