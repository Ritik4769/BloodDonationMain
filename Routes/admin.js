import express from "express";
import {adminViewBloodInventory,adminlogin,viewacceptcampdetail,verifyemail,adminUserController,Addbloodunitcontroller,adminDonorController,adminUploadReportController,adminSeeReportController,adminRecipientController,admindonorReportController,bloodbank,admin_organization,adminviewcampdetailsController,adminAcceptRequestController,adminAcceptReqFormController,adminSuccessfulController,verifyotp,updatepassword,adminAproveController,adminDeclineController,expirynotificationController,adminAcceptAppFormController,adminSuccessAppfulController,addcampunit,donateddonor,viewcompletecamp} from '../controller/admincontroller.js';
import {deleteExpiredUnitsController} from '../controller/bloodbankController.js';
import {upload2,upload} from '../middleware/upload.js';
const router = express.Router();

router.use(express.static('public'))

router.get("/",(req,res)=>{
    res.render("pages/admin_login",{email:"",pass:"",msg:"",otp:""});
});
router.post("/emailverify",verifyemail);
router.post("/verifyotp",verifyotp);
router.post("/updatepassword",updatepassword)
router.get('/admin_dashboard',(req,res)=>{
    res.render('pages/admin_dashboard');
});
router.get("/give_blood",(req,res)=>{
    res.render("pages/admin_accept_request",{existingUser:"",otp:"enter otp",msg:"enter otp"});
});
router.post('/Addbloodunit');

router.get('/admin_user_detail',adminUserController);
router.get('/admin_donor_detail',adminDonorController);
router.get('/blood_bank',bloodbank);
router.get("/admin_organization",admin_organization);
router.get('/blood_inventory',adminViewBloodInventory);

router.get('/adminUploadReport/:_id',adminUploadReportController);
router.post('/donorReport/:_id',upload2,admindonorReportController,donateddonor);
router.get('/adminSeeReport/:_id',adminSeeReportController);
router.post("/admin_login",adminlogin,deleteExpiredUnitsController);
router.post('/addunit',Addbloodunitcontroller,adminViewBloodInventory);
router.get("/blood_request",adminRecipientController);
router.get("/admin_camp_request",adminviewcampdetailsController);
router.get('/acceptrequest/:_id/:name/:email',adminAcceptRequestController,adminRecipientController)
router.post('/acceptreqform',adminAcceptReqFormController);
router.get('/admin_accept_request',adminAcceptRequestController);
router.post('/successful',adminSuccessfulController,adminRecipientController);
router.get("/adminAproveReport/:_id",adminAproveController,adminviewcampdetailsController);
router.get("/adminDeclineReport/:_id",adminDeclineController,adminviewcampdetailsController);
router.get("/adminexpirynotification",expirynotificationController);
router.get('/removenotification',(req,res)=>{
    res.render('pages/admin_expiry_notification',{expiringBloodUnits:""});

});
router.get('/acceptappform',(req,res)=>{
    res.render("pages/admin_accept_appointment",{existingUser:"",otp:"enter otp",msg:"enter otp"});
});
router.post('/acceptappform',adminAcceptAppFormController);
router.get('/successfulApp/:otp',adminSuccessAppfulController,adminDonorController);
router.get("/accept_camp",viewacceptcampdetail);
router.post("/add_camp_unit",addcampunit,viewacceptcampdetail);
router.get('/donated_donor',donateddonor)
router.get('/viewcompletecamp',viewcompletecamp)
export default router;