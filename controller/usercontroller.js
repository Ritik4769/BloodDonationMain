import {usermodel} from '../model/usermodel.js';
import bcrypt from 'bcrypt';
export const registercontroller=async (req,res)=>{
    const {name,age,gender,email,cpass,contact,city,state}=req.body;
    console.log("password : "+cpass+" email : "+email);
    try{
         const existinguser=await usermodel.findOne({email:email});         
         console.log(existinguser);
         if(existinguser){            
            // console.log(password);
            res.render("pages/user_registration",{email:"this email allready exist",con:"contact number already exist"});
         }
         else{
            const hashpassword = await bcrypt.hash(cpass,10);
            const newuser=await usermodel.create({
                name:name,
                age:age,
                gender:gender,
                email:email,
                password:hashpassword,
                mobile:contact,
                city:city,
                state:state,
                role:"User"
            });
            console.log('password : ',newuser.password);
            res.render("pages/user_profile",{user:newuser});
         }
    }
    catch(err){
        console.log('something went wrong',err);
    }
}
// export const logincontroller=async (req,res)=>{
//     const {email,password}=req.body;
//     try{
//         const founduser=await usermodel.findOne({email:email});
//         console.log('user '+founduser);
//         if(!founduser){
//             console.log('user '+founduser);
//             res.render("pages/user_login",{email:"email not found",password:""});
//         }        
//             var validpass=await bcrypt.compare(password,founduser.password);
//             if(!validpass){
//                 res.render("pages/user_login",{email:"",password:"password not match"});
//             }
//             res.render("pages/user_profile",{user:founduser});        
        
//     }
//     catch{
//         console.log('lola lelo');
//     }
// }
