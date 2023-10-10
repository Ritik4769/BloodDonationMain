import Registration from "../model/blood_bankregistration.js";
import bcrypt from 'bcrypt';
export const blood_bank_AddController =async (req,res)=>{
   
  try {
    console.log("reqbodey",req.body);
    const {bloodBankname,ownerNamename,bloodBankCategory,licenseNumber,parentHospital,openingTime,closingTime,days,bloodBankEmail,password,ownerContactNo, bloodBankAddress,city, state,zipcode} = req.body
    const exist=await Registration.findOne({bloodBankEmail:bloodBankEmail});
    if(exist){
      res.render("pages/blood_bank_registration",{msg:"email aready exist"});
    }
    else{
      const hashpassword=await bcrypt.hash(password,10);
      const newBloodBank=await Registration.create({
        bloodBankname:bloodBankname,
        ownerNamename:ownerNamename,
        bloodBankCategory: bloodBankCategory,
        licenseNumber: licenseNumber,
        parentHospital: parentHospital,
        openingTime:openingTime,
        closingTime:closingTime, 
        days:days,
        bloodBankEmail: bloodBankEmail,
        password:hashpassword,
        ownerContactNo:ownerContactNo,
        bloodBankAddress:bloodBankAddress,
        city:city,
        state: state,
        zipcode:zipcode,
        role:"BloodBank"
      });
      res.render("pages/blood_bank_profile",{user:newBloodBank});
    }   
    
  } catch (error) {
    console.log(error)
  }
 
}
export const ViewUserController = async (req,res)=>{
  try {
      const result = await BloodBankRegistration.find()
      // console.log(result);
      res.render("viewuser",{userrecord:result});
  } catch (error) {
   
  }
}



