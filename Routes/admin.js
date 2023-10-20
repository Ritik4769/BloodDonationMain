import express from "express";
import {adminViewBloodInventory,adminlogin,adminUserController,Addbloodunitcontroller,adminDonorController,adminUploadReportController,adminSeeReportController,adminRecipientController,admindonorReportController,admincamprequestController,bloodbank,admin_organization} from '../controller/admincontroller.js';
import {upload2,upload} from '../middleware/upload.js';
const router = express.Router();

router.use(express.static('public'))

router.get("/",(req,res)=>{
    res.render("pages/admin_login",{email:"",pass:""});
})
router.get('/admin_dashboard',(req,res)=>{
    res.render('pages/admin_dashboard');
});
router.post('/Addbloodunit');

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
//module.exports=router;


export default router;