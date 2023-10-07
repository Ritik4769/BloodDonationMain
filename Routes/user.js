import express from 'express';
import {registercontroller} from '../controller/usercontroller.js';

var router=express.Router();
router.use(express.static('public'));
router.get('/user_registration',(req,res)=>{
    res.render('pages/user_registration',{email:"",con:""});
});
router.get('/user_login/:role',(req,res)=>{
    var role=req.params.role;
    res.render('pages/user_login',{email:"",pass:"",role:role});
});
router.get('/appointment',(req,res)=>{
    res.render('pages/appointment');
});
router.get('/blood_request',(req,res)=>{
    res.render('pages/blood_request');
});
router.get('/edit_profile/:email');
router.post('/adddata',registercontroller);

 export default router;