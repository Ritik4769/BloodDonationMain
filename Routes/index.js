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
router.get('/blood_request',function(req,res){
  res.render('pages/blood_request');
});
router.get('/blood_bank_registration',function(req,res){
  res.render('pages/blood_bank_registration');
});
router.get('/blood_bank_search',function(req,res){
  res.render('pages/blood_bank_search');
});
router.get('/contact_us',function(req,res){
  res.render('pages/contact_us');
});
router.get('/appointment',function(req,res){
  res.render('pages/appointment');
});
router.get('/donor_profile',function(req,res){
  res.render('pages/donor_profile');
});
router.get('/recipient_registration',function(req,res){
  res.render('pages/recipient_registration');
});
router.get('/donor_registration',function(req,res){
  res.render('pages/donor_registration');
});
module.exports = router;