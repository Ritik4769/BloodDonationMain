import { usermodel } from '../model/usermodel.js';
import { organization1 } from "../model/organizationmodel.js";
import Registration from "../model/blood_bankregistration.js";
import bcrypt from "bcrypt";
import crypto from 'crypto';
import jwt from "jsonwebtoken";
const maxAge = 3 * 24 * 60 * 60;
// const SECRET_KEY = crypto.randomBytes(32).toString('hex');
const SECRET_KEY = "crypto.randomBytes(32).toString('hex')";
let token;

const logincontroller = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        console.log("ffdfdfdfd");
        const payload = {};
        const expiryTime = {
            expiresIn: '1d'
        }
        if (role == "user") {
            const exist = await usermodel.findOne({ email: email });
            if (exist) {
                const pass = await bcrypt.compare(password, exist.password);
                if (pass) {

                    payload.user = exist;
                    console.log(payload.user);
                    token = jwt.sign(payload, SECRET_KEY, expiryTime);
                    res.cookie('jwt', token, { httpOnly: true, maxAge: 86400*1000 });
                    res.redirect("user_profile");
                } else {
                    res.render("pages/user_login", { email: "", pass: "password not matched", role: role });
                }
            }
            else {
                res.render("pages/user_login", { email: "email not found", pass: "", role: role });
            }
        }
        else if (role == "bank") {
            const exist = await Registration.findOne({ bloodBankEmail: email });

            if (exist) {

                const pass = await bcrypt.compare(password, exist.password);
                if (pass) {
                    payload.user = exist;
                    console.log(payload.user);
                    token = jwt.sign(payload, SECRET_KEY, expiryTime);
                    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });
                    res.redirect("user_profile");
                } else {
                    res.render("pages/user_login", { email: "", pass: "", role: role });
                }
            }
            else {
                res.render("pages/user_login", { email: "email not found", pass: "", role: role });
            }
        }
        else if (role == "camp") {
            console.log("camp")
            const exist = await organization1.findOne({ Email: email });
            if (exist) {
                console.log("camp1")

                const pass = await bcrypt.compare(password, exist.Password);
                if (pass) {
                    console.log("camp2")
                    payload.user = exist;
                    console.log(payload.user);
                    token = jwt.sign(payload, SECRET_KEY, expiryTime);
                    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });
                    // res.render("pages/blood_bank_profile", { bank: exist });
                    res.redirect("user_profile");

                } else {
                    res.render("pages/user_login", { email: "", pass: "password not matched", role: role });
                }
            }
            else {
                res.render("pages/user_login", { email: "email not found", pass: "", role: role });
            }
        }
    } catch (err) {
        console.log('error', err);
    }
}


const authenticateJWT = (request, response, next) => {
    console.log("authenticateJWT : ");
    const token = request.cookies.jwt;
    if (!token) {
        response.json({ message: "Error Occured while dealing with Token inside authenticateJWT" });
    }
    jwt.verify(token, SECRET_KEY, (err, payload) => {
        if (err)
            response.json({ message: "Error Occured while dealing with Token during verify" });
        request.payload = payload;
        next();
    });
}

const authorizeUser = (request, response, next) => {
    console.log("authorizeUser : ");
    console.log(request.payload.user)
    if (request.payload.user.role == "User") {
        response.render("pages/user_profile", { user: request.payload.user });
    } else if (request.payload.user.role == "BloodBank") {
        console.log("blood....");
        response.render("pages/blood_bank_profile", { user: request.payload.user });
    } else {
        console.log("camppppp")
        response.render("pages/index1");
    }
    next();
}

export { logincontroller, authenticateJWT, authorizeUser, jwt, SECRET_KEY };