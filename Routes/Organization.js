import express from 'express';
import {orgegController} from '../controller/organizatincontroller.js';

const router = express.Router();
router.use(express.static('public'));
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
router.get('/Organization_registration',function(req,res){
    res.render('pages/Organization_registration');
});
router.get('/Organization_login/:role',function(req,res){
    var role=req.params.role;
    res.render('pages/user_login',{email:"",pass:"",role:role});
});
router.get('/Organization_profile',function(req,res){
    res.render('pages/Organization_profile');
});
router.get('/edit_profile',function(req,res){
    res.render('pages/edit_profile');
});
router.post("/register",orgegController);  

export default router;