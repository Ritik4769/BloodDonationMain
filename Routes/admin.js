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
module.exports=router;