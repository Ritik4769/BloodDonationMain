import {usermodel,appDataModel,bloodReqModel} from '../model/usermodel.js';
import {blood_bank_inventory} from '../model/adminBloodinventory.js';
import {camp1} from '../model/organizationmodel.js';
import bcrypt from 'bcrypt';
import {mailer} from './mailer.js';
import randomstring from 'randomstring';
import moment from 'moment';
var userdata={};
var otp="";
var unit,bloodgroup="";
export const verifyemail=async(req,res)=>{
         userdata=req.body;
         try{
         const existinguser=await usermodel.findOne({email:userdata.email});         
         console.log(existinguser);
         if(existinguser){            
            console.log(password);
            res.render("pages/user_registration",{userdata:userdata,email:"email already exist",otp:"",wrongotp:""});
         }
         else{  
            console.log("OTP controller Runned",userdata);
            otp=randomstring.generate({
              length:4,
              charset:'numeric',
            });
            console.log('otp',otp);
            var message=`Hello <b>${req.body.name}</b> <br>Your One time password is ${otp} enter the otp and register yourself in our Website<br>Thank You 😊`;
            var email = req.body.email;
            mailer(email,message,(info)=>{
              if(info){
                res.render("pages/user_registration",{userdata:"",email:"",otp:"email sent",wrongotp:""});
              }
              res.render("pages/user_registration",{userdata:userdata,email:"email not sent ",otp:"",wrongotp:""});
            });
       }
      }catch(error){
        console.log('error : ',error);
      }
}
export const verifyotp=async (req,res)=>{
    console.log("password : "+userdata.cpass+" email : "+userdata.email);
    var {userotp}=req.body;
    console.log(userdata.password)
    if(otp==userotp){
    try{                   
        const hashpassword = await bcrypt.hash(userdata.cpass,10);
        const newuser=await usermodel.create({
            name:userdata.name,
            age:userdata.age,
            gender:userdata.gender,
            email:userdata.email,
            password:hashpassword,
            mobile:userdata.contact,
            city:userdata.city,
            state:userdata.state,
            bloodgroup:userdata.blood_group,
            last_donation_date:userdata.last_donation_date,
            donation_count:0
        });
        console.log('password : ',newuser.password);
        res.render("pages/user_profile",{user:newuser,msg1:""});
    }
    catch(err){
        console.log('something went wrong',err);
    }
  }else{
    res.render('pages/user_registration',{userdata:userdata,email:"",otp:"",wrongotp:"Wrong Otp Try Again"});
  }
}

export const appDataController = async(req,res)=>{
  try{    
    const {id,disease,date,time} = req.body;
    const existingUser = await usermodel.findOne({_id:id});
    var email=existingUser.email;
    var otp=randomstring.generate({
      length:4,
      charset:'numeric'
    });
    console.log('otp',otp);
    var message=`Hello <b>${existingUser.name}</b><br>Your Appointment for blood donation is scheduled on ${date} at ${time}.<br>Your Otp is ${otp} take this otp when you come to donate<br>Thank You 😊`;
    var date1=moment(date,'YYYY-MM-DD').toDate();
     
     if(existingUser.last_donation_date){
      console.log('date1 '+date1);
      
      console.log(date1.getFullYear());
      var date2=existingUser.last_donation_date;
      console.log(date2.getFullYear());

       var diffinmonth=(date1.getFullYear() - date2.getFullYear()) * 12 + date1.getMonth() - date2.getMonth();

       console.log('diff : '+diffinmonth);
       console.log('last '+typeof existingUser.last_donation_date+" "+existingUser.last_donation_date);
       console.log('type: '+typeof date2+" date "+date2);

       if(diffinmonth>=3){  
             var appdata=await appDataModel.findOne({user_id:id});
             if(existingUser.donation_count>=1){
              await appDataModel.updateOne({user_id:id},{$set:{
                time:time,
                appointment_date:date1,
                disease:disease,
                otp:otp,
                status:false
              }});
             }
             else{
              await appDataModel.create({
                user_id:id,
                disease:disease,
                time:time,
                appointment_date:date1,
                otp:otp,
                status:false
              });
             }            
             mailer(email,message,(info)=>{
              if(info){
                res.render("pages/appointment",{id:existingUser._id,successMessages:`${existingUser.name} your Appointment Date is ${date} and Time is ${time}`,decline:""});
              }
             });
       }
       else{
        res.render("pages/appointment",{id:existingUser._id,successMessages:"",decline:"You cannot donate blood as per the difference between last donation date and appointment date difference is not more than 3 month"});
       }
     }
     else{
      await appDataModel.create({
        user_id:id,
        disease:disease,
        time:time,
        appointment_date:date1,
        status:false,
        otp:otp
      });
      mailer(email,message,(info)=>{
       if(info){
         res.render("pages/appointment",{id:existingUser._id,successMessages:`${existingUser.name} your Appointment Date is ${date}`,decline:""});
       }
      });
    }
   }catch(err){
       console.log("error:",err);
   }
}
export const bloodRequestController = async(req,res)=>{
  try{
          const {id,patientName,bloodGroup,diseases,doctorPrescriptionImage} = req.body;
          console.log("email ",req.body);
          // console.log('',doctorPrescriptionImage);
          const existingUser = await usermodel.findOne({_id:id});
          console.log(" ",existingUser);
          var name = existingUser.name;
          console.log(req.body);
          var doc = new bloodReqModel({
            user_id:id,
            patient_name:patientName,
            disease:diseases,
            bloodGroup:bloodGroup,
            doctorPrescriptionImage:req.file.filename,
            otp:0,
            status:"Pending"
          });
          const result = await doc.save();
          console.log(result);                    
          res.render("pages/user_profile",{user:existingUser,msg1:"request sent successfully"});
     }catch(err){
         console.log("error:"+err);
     }
}

export const update_Controller=async(req,res)=>{
  var {name,email,age,gender,blood_group,city,state,contact}=req.body;
  var update=await usermodel.updateOne({email:email},{
    $set:{
    name:name,
    age:age,
    gender:gender,
    city:city,
    state:state,
    mobile:contact,
    bloodgroup:blood_group
  }
});
  var user=await usermodel.findOne({email:email});
  console.log(user);  
  res.render("pages/user_profile",{user:user,msg1:"data updated "});
}

export const userSeeReportController = async(req,res)=>{
  try{ 
    var id = req.params.id;
    console.log("id:"+id);
    var data = await appDataModel.findOne({user_id:id},{reportImg:1,_id:0});
    console.log(data);
    
    res.render("pages/userBloodReport",{data:data.reportImg});
    }catch(err){
      console.log("err"+err);
    }
  }
  export const searchblood = async (req, res) => {
    console.log('searchblood');
    unit = req.query.unit;
    bloodgroup = req.query.bloodgroup;
    console.log(bloodgroup);  
    try {
      // Use a Mongoose query to check blood availability
      const bloodRecord = await blood_bank_inventory.findOne({email:'dabidipesh7898@gmail.com'});

      console.log(bloodRecord);

      if (bloodRecord && bloodRecord[bloodgroup] >= unit) {        
        res.render('pages/index1',{bloodgroup: bloodgroup,available: 'Blood is available',notavailable: ''});
      } else {
        res.render('pages/index1',{bloodgroup: bloodgroup,available: '',notavailable: 'This Blood Group is Not Available'});
      }
    } catch (err) {
      console.log('error: ', err);
    }
  };  
  export const blood_search=async(req,res)=>{
    console.log("blood group"+bloodgroup);
    res.render("pages/blood_bank_search",{result:"",bloodgroup: bloodgroup, unit:unit});
  }
  export const upcomingcamp=async(req,res)=>{
    try{
      var  today=new Date(); 
      var year=today.getFullYear();
      var month=today.getMonth()+1;
      var day=today.getDate();
      var date= `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      console.log(date);
      let result = await camp1.aggregate([
        {
          $match: {
            $and: [
              { Date: { $gte: date } },
              { Status: "Accept" }
            ]
          }
        },
        { $limit: 3 }
      ]);
      if(result){
        console.log('data',result);
      res.render("pages/Camp",{data:result});
      }
      else{
        res.render("pages/Camp",{data:""});
      }
    }
    catch(error){
      console.log('error',error);
    }
  }

export const userprofile=async(req,res)=>{
  var id=req.params.id;
  try{
     var user=await usermodel.findOne({_id:id});
     res.render("pages/user_profile",{user:user,msg1:""});
  }catch(error){
    console.log('error',error);
  }
}