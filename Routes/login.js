import express from 'express';
import  {logincontroller,authenticateJWT,authorizeUser,jwt,SECRET_KEY,emailverify,verifyotp,update_password}  from '../controller/logincontroller.js';
var router=express.Router();

router.post('/logindata',logincontroller);
router.get("/user_profile",authenticateJWT,authorizeUser,(request, response) => {
    console.log("Task Complete");
});
router.post('/emailverify',emailverify);
router.post('/verifyotp',verifyotp);
router.post('/password',update_password);
router.get("/logout/:email",(req,res)=>{
    // var token=req.cookies.jwt;
    // console.log(token);
    // token="";
    // res.cookie("jwt",token);
    res.cookie("jwt",'');
    res.render("pages/index1",{bloodgroup:"",available:"",notavailable:""});
});

export default router;