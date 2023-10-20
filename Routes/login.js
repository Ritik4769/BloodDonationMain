import express from 'express';
<<<<<<< HEAD
import  {logincontroller,authenticateJWT,authorizeUser,jwt,SECRET_KEY,emailverify,verifyotp,update_password}  from '../controller/logincontroller.js';
var router=express.Router();

router.post('/logindata',logincontroller);
router.get("/user_profile",authenticateJWT,authorizeUser,(request, response) => {
    console.log("Task Complete");
});
router.post('/emailverify',emailverify);
router.post('/verifyotp',verifyotp);
router.post('/password',update_password);

=======
import  {logincontroller,authenticateJWT,authorizeUser}  from '../controller/logincontroller.js';
var router=express.Router();
router.post('/logindata',logincontroller);
router.get("/user_profile",authenticateJWT,authorizeUser, (request, response) => {
    console.log("Task Complete");
});
>>>>>>> e5182a55fa75377ae5ad85b9a989111fd8ca8ac4
export default router;