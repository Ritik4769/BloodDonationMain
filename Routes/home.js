import express from 'express';
const router = express.Router();
var app=express();
router.use(express.static('public'));
router.get('/',(req,res)=>{
<<<<<<< HEAD
    res.render('pages/index1',{bloodgroup:"",available:"",notavailable:""});
});
router.get('/index1',(req,res)=>{
    res.render('pages/index1',{bloodgroup:"",available:"",notavailable:""});
=======
    res.render('pages/index1');
});
router.get('/index1',(req,res)=>{
    res.render('pages/index1');
>>>>>>> e5182a55fa75377ae5ad85b9a989111fd8ca8ac4
});
router.get('/about',(req,res)=>{
    res.render('pages/about');
});
router.get('/contact',(req,res)=>{
    res.render('pages/contact_us');
});
router.get('/camp',(req,res)=>{
<<<<<<< HEAD
    res.render("pages/Camp");
=======
    res.render('pages/Camp');
>>>>>>> e5182a55fa75377ae5ad85b9a989111fd8ca8ac4
});
export default router;