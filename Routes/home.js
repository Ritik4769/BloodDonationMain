import express from 'express';
import {upcomingcamp} from '../controller/usercontroller.js';
//mport {deleteExpiredUnitsController} from '../controller/bloodbankController.js';
const router = express.Router();
var app=express();
router.use(express.static('public'));
router.get('/',(req,res)=>{
    res.render('pages/index1',{bloodgroup:"",available:"",notavailable:""});
});
router.get('/index1',(req,res)=>{
    res.render('pages/index1',{bloodgroup:"",available:"",notavailable:""});
});
router.get('/about',(req,res)=>{
    res.render('pages/about');
});
router.get('/contact',(req,res)=>{
    res.render('pages/contact_us');
});
router.get('/camp',upcomingcamp);
export default router;