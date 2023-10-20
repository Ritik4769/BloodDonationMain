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

export default router;