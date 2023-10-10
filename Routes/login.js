import express from 'express';
import  {logincontroller,authenticateJWT,authorizeUser}  from '../controller/logincontroller.js';
var router=express.Router();
router.post('/logindata',logincontroller);
router.get("/user_profile",authenticateJWT,authorizeUser, (request, response) => {
    console.log("Task Complete");
});
export default router;