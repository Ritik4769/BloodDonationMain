import { usermodel } from '../model/usermodel.js';
import { organization1 } from "../model/organizationmodel.js";
import Registration from "../model/blood_bankregistration.js";
import bcrypt from "bcrypt";

const logincontroller = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        if (role == "user") {
            const exist = await usermodel.findOne({ email: email });
            if (exist) {
                const pass = await bcrypt.compare(password, exist.password);
                if (pass) {
                    res.render("pages/user_profile", { user: exist });
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
                    res.render("pages/index1");
                } else {
                    res.render("pages/user_login", { email: "", pass: "password not matched", role: role });
                }
            }
            else {
                res.render("pages/user_login", { email: "email not found", pass: "", role: role });
            }
        }
        else if (role == "camp") {
            const exist = await organization1.findOne({ Email: email });
            if (exist) {
                const pass = await bcrypt.compare(password, exist.Password);
                if (password == exist.password) {
                    res.render("pages/blood_bank_profile",{bank:exist});
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
export default logincontroller;