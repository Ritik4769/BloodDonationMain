import {organization1} from "../model/organizationmodel.js";
import bcrypt from 'bcrypt';
export const orgegController = async (req,res)=>
{
try {
    console.log(req.body);
    const { OrganizationName, OrganizerName ,Contact ,email , password, city, state,description} = req.body;
    const existingUser = await organization1.findOne({Email:email});
    if(existingUser){
       res.render("pages/Organization_registration",{msg:"email already exist"});
    }
    var hashpassword=await bcrypt.hash(password,10);
    var doc = await organization1.create({
        OrganizationName:OrganizationName,
        OrganizerName:OrganizerName,
        ContactNumber:Contact,
        Email:email,
        Password:hashpassword,
        City:city,
        State:state,
        Description:description
  });    
   //   console.log(result);
     console.log("Data inserted Successfully");   
     res.render("pages/index1");
    
  } catch (error) {
    console.log("Error"+error);
  }
 
}