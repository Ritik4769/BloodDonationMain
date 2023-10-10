import { blood_bank_inventory } from "../model/adminBloodinventory.js";
export const adminViewBloodInventory = async (req, res) => {
    console.log("admin view blood controller");
    try {
        const result = await blood_bank_inventory.find();
        console.log(result);
        res.render("pages/admin_blood_inventory", { userrecord: result });
    } catch (error) {

    }
}
export const adminlogin = (req, res) => {
    var { email, password } = req.body;
    if (email == "admin@gmail.com") {
        if (password = "admin@123")
            res.render('pages/admin_dashboard');
        else
            res.render("pages/admin_login", { email: "", pass: "password not matched" });
    } else {
        res.render("pages/admin_login", { email: "email not matched", pass: "" });
    }
}

