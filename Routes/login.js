import express from 'express';
import  logincontroller  from '../controller/logincontroller.js';
var router=express.Router();
router.post('/logindata',logincontroller);
export default router;