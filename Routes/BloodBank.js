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
router.get('/blood_bank_registration',(req,res)=>{
    res.render('pages/blood_bank_registration');
});
router.get('/blood_bank_login',(req,res)=>{
    res.render('pages/blood_bank_login');
});
router.get('/blood_bank_profile',(req,res)=>{
    res.render('pages/blood_bank_profile');
});
router.get('/blood_inventory',(req,res)=>{
    res.render('pages/blood_inventory');
})

module.exports=router;