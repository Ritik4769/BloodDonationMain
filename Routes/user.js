import express from 'express';
import { registercontroller } from '../controller/usercontroller.js';
import { jwt, SECRET_KEY } from '../controller/logincontroller.js';


var router = express.Router();
router.use(express.static('public'));
router.get('/user_registration', (req, res) => {
    res.render('pages/user_registration', { email: "", con: "" });
});
router.get('/user_login/:role', (req, res) => {
    var role = req.params.role;
    console.log("loooogggggvhbkjnj user");
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, SECRET_KEY, (err, decodedToken) => {
            console.log(decodedToken);
            if (err) {
                console.log("err", err)
                res.render("pages/user_login", { email: "", pass: "", role: role });
            } else {
                console.log("else models user");
                if (decodedToken.user.role == "User") {
                    res.render("pages/user_profile", { user: decodedToken.user });
                }
                else {
                    res.render("pages/user_login", { email: "", pass: "", role: role });
                }
            }
        });
    } else {
        console.log("lll");
        res.render("pages/user_login", { email: "", pass: "", role: role });
    }

    // res.render('pages/user_login',{email:"",pass:"",role:role});
});
router.get('/appointment', (req, res) => {
    res.render('pages/appointment');
});
router.get('/blood_request', (req, res) => {
    res.render('pages/blood_request');
});
router.get('/edit_profile/:email');
router.post('/adddata', registercontroller);

export default router;