import {usermodel,appDataModel,bloodReqModel} from '../model/usermodel.js';
import bcrypt from 'bcrypt';
import {transporter} from '../model/emailmodel.js';
import randomstring from 'randomstring';
import moment from 'moment';
var userdata={};
var otp="";
var unit,bloodgroup="";
export const verifyemail=async(req,res)=>{
  userdata=req.body;
  console.log("OTP controller Runned",userdata);
  otp=randomstring.generate({
    length:4,
    charset:'numeric',
  });
  const mailOptions = {
    from: 'dabidipesh7898@gmail.com',
    to: req.body.email,
    subject: `OTP is ${otp}`,
    text: `Hello ${req.body.name}\n your one time Password is ${otp} enter this opt and register yourself`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.render('pages/user_registration',{userdata:"",email:"email not exist",otp:"",wrongotp:""});
    } else {
      res.render("pages/user_registration",{userdata:"",email:"",otp:"opt sent",wrongotp:""});
    }
  });
}
export const verifyotp=async (req,res)=>{
    console.log("password : "+userdata.cpass+" email : "+userdata.email);
    var {userotp}=req.body;
    if(otp==userotp){
    try{
         const existinguser=await usermodel.findOne({email:userdata.email});         
         console.log(existinguser);
         if(existinguser){            
            console.log(cpass);
            res.render("pages/user_registration",{userdata:req.body,email:"email already exist",otp:"",wrongotp:""});
         }
         else{       
            
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
            res.render("pages/user_profile",{user:newuser,msg:""});
         }
    }
    catch(err){
        console.log('something went wrong',err);
    }
  }else{
    res.render('pages/user_registration',{userdata:"",email:"",otp:"",wrongotp:"Wrong Otp Register Again"});
  }
}

export const appDataController = async(req,res)=>{
  try{
    const {id,disease,date,time} = req.body;
    const existingUser = await usermodel.findOne({_id:id});
    //  var name = existingUser.name;
     var date1=moment(date,'YYYY-MM-DD').toDate();
     if(existingUser.last_donation_date){
       console.log('date1 '+date1);
      //  var date3=new Date(date);

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
              await usermodel.updateOne({_id:id},{$set:{
                donation_count:(parseInt(existingUser.donation_count)+1),
                last_donation_date:date1
              }});
              await appDataModel.updateOne({user_id:id},{$set:{
                time:time,
                appointment_date:date1,
                disease:disease
              }});
              // var user=await usermodel.findOne({email:email});
              res.render("pages/appointment",{id:existingUser._id,successMessages:`${existingUser.name} your Appointment Date is ${date}`,decline:""});
             }
             else{
              await usermodel.updateOne({_id:id},{$set:{
                donation_count:1,
                last_donation_date:date1
              }});
              await appDataModel.create({
                user_id:id,
                disease:disease,
                time:time,
                appointment_date:date1
              });
              var user=await usermodel.findOne({_id:id});
              res.render("pages/appointment",{id:existingUser.email,successMessages:`${existingUser.name} your Appointment Date is ${date}`,decline:""});
              // res.render("pages/user_profile",{user:user});
             }
       }
       else{
        res.render("pages/appointment",{id:existingUser._id,successMessages:"",decline:"You cannot donate blood as per the difference between last donation date and appointment date difference is not more than 3 month"});
       }
     }
     else{
      await usermodel.updateOne({_id:id},{$set:{
        donation_count:1,
        last_donation_date:date1
      }});
      await appDataModel.create({
        user_id:id,
        disease:disease,
        time:time,
        appointment_date:date1
      });
     var user=await usermodel.findOne({email:email});
     console.log(result);
     res.render("pages/appointment",{id:existingUser._id,successMessages:`${existingUser.name} your Appointment Date is ${date}`,decline:""});
    //  res.render("pages/user_profile",{user:user});
    }
   }catch(err){
       console.log("error:",err);
   }
}
export const bloodRequestController = async(req,res)=>{
  try{
          const {id,patientName,bloodGroup,diseases,doctorPrescription} = req.body;
          console.log("email "+id);
          const existingUser = await usermodel.findOne({_id:id});
          var name = existingUser.name;
          console.log(req.body);
          var doc = new bloodReqModel({
            user_id:id,
            patient_name:patientName,
            disease:diseases,
            bloodGroup:bloodGroup,
            dr_Prescription:doctorPrescription,
            // dr_PrescriptionImg:req.file.filename;
          });
          const result = await doc.save();
          console.log(result);
          
          res.render("pages/user_profile",{user:existingUser,msg:"request sent successfully"});
     }catch(err){
         console.log("error:"+err);
     }
}

export const update_Controller=async(req,res)=>{
  var {name,email,age,gender,city,state,contact}=req.body;
  var update=await usermodel.updateOne({email:email},{
    $set:{
    name:name,
    age:age,
    gender:gender,
    city:city,
    state:state,
    mobile:contact
  }
});
  var user=await usermodel.findOne({email:email});
  console.log(user);  
  res.render("pages/user_profile",{user:user,msg:"data updated "});
}


export const userSeeReportController = async(req,res)=>{
  try{ 
    var id = req.params.id;
    console.log("email:"+id);
    var data = await appDataModel.findOne({user_id:id},{reportImg:1,_id:0});
    console.log(data);
    // const donorReport = [];
    // Loop through the data and push report images to donorReport
    // data.forEach(element => {
    //   donorReport.push(element.reportImg);
    // });
    // console.log("donorReport:", donorReport);
    res.render("pages/userBloodReport",{data:data.reportImg});
  }catch(err){
    console.log("err"+err);
  }
  }
  export const searchblood=async (req,res)=>{
       unit=req.query.unit;
       bloodgroup=req.query.bloodgroup;
       try{
           if(unit>0){
            res.render("pages/index1",{bloodgroup:bloodgroup,available:"Blood is available",notavailable:""});
           }
           else{
            res.render("pages/index1",{bloodgroup:bloodgroup,available:"",notavailable:"This Blood Group is Not Available"});
           }
       }catch(err){
        console.log('error : ',err);
       }
  }