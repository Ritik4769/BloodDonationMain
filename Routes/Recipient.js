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
router.get('/recipient_registration',function(req,res){
    res.render('pages/recipient_registration');
  });
router.get('/recipient_login',function(req,res){
    res.render('pages/recipient_login');
});
router.get('/recipient_profile',function(req,res){
    res.render('pages/recipient_profile');
});
router.get('/blood_request',function(req,res){
    res.render('pages/blood_request');
});
router.get('/edit_profile',function(req,res){
    res.render('pages/edit_profile');
});
router.get('/blood_bank_search',function(req,res){
    res.render('pages/blood_bank_search');
});
module.exports=router;