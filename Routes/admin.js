const express = require('express');
const router = express.Router();

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
router.get('/admin_dashboard',(req,res)=>{
    res.render('pages/admin_dashboard');
});
router.get('/admin_donor_detail',(req,res)=>{
    res.render('pages/admin_donor_detail');
});
router.get('/admin_donor_report',(req,res)=>{
    res.render('pages/admin_donor_report');
});
router.get('/admin_camp_request',(req,res)=>{
    res.render('pages/admin_camp_request');
});
router.get('/admin_blood_inventory',(req,res)=>{
    res.render('pages/admin_blood_inventory');
});
router.get('/admin_upload_report',(req,res)=>{
    res.render('pages/admin_upload_report');
});
router.get('/admin_see_report',(req,res)=>{
    res.render('pages/admin_see_report');
});
module.exports=router;