import Registration from "../model/blood_bankregistration.js";
import {blood_bank_inventory} from '../model/adminBloodinventory.js';
import {Add_blood_Unit} from '../model/adminmodel.js';
import bcrypt from 'bcrypt';
// import {transporter} from '../model/emailmodel.js';
import randomstring from 'randomstring';
import {mailer} from './mailer.js';
import axios from 'axios';
import url from 'url';
var blood_bank_data={};
var otp="";

const apiKey = '3ad5877981e942d897df1f410c48c621';

async function getCoordinates(address, city, state) {
  try {
    const fullAddress = `${address}, ${city}, ${state}`;
    const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(fullAddress)}&key=${apiKey}`);
    console.log('fulladdress ',fullAddress);
    console.log('response ',response);
    if (response.data.status.code === 200) {
      console.log("geometry "+response.data.results[0].geometry);
      const location = response.data.results[0].geometry;
      const latitude = location.lat;
      const longitude = location.lng;
      return { latitude,longitude };
    } else {
      console.error('Geocoding failed. Status:', response.data.status.message);
      return null;
    }
  } catch (error) {
    console.error('Error while geocoding:', error);
    return null;
  }
}

export const blood_bank_AddController =async (req,res)=>{  
  if(otp==req.body.bankotp) {

  try {
    console.log("reqbody",req.body.bankotp);
    const {bloodBankname,ownerNamename,bloodBankCategory,licenseNumber,Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,parentHospital,openingTime,closingTime,bloodBankEmail,password,ownerContactNo,bloodBankAddress,city,state,zipcode} = blood_bank_data;
    
    const exist=await Registration.findOne({bloodBankEmail:bloodBankEmail});
    if(exist){
      res.render("pages/blood_bank_registration",{blood_bank:blood_bank_data,email:"email allready exist",otp:"",wrongotp:""});
    }
    else{
      const coordinates = await getCoordinates(bloodBankAddress,city,state);
        if (!coordinates) {
          res.render("pages/blood_bank_registration", {blood_bank:blood_bank_data,email:"",otp:"",wrongotp:"Coordinates Not Find" });
        }
        const days=Sunday+","+Monday+","+Tuesday+","+Wednesday+","+Thursday+","+Friday+","+Saturday;
        console.log("Days opened "+days);
        const { latitude, longitude } = coordinates;
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
        latitude:latitude, // Store the latitude in the database
        longitude:longitude, // Store the longitude in the database
      });
      res.render("pages/blood_bank_profile",{bloodbank:newBloodBank,msg:""});
    }   
    
  } catch (error) {
    console.log(error)
  }
 }else{
  res.render("pages/blood_bank_registration",{blood_bank:blood_bank_data,email:"",otp:"",wrongotp:"Wrong Otp Register Again"});
 }
}

export const verifyemail=async(req,res)=>{
  blood_bank_data=req.body;
  console.log("OTP controller Runned",blood_bank_data);
  otp=randomstring.generate({
    length:4,
    charset:'numeric',
  });
  console.log('otp',otp);
  var message = `Hello <b>${req.body.bloodBankName}</b> <br> Your One Time Password is ${otp} enter this code and register yourself <br>Thank You 😊`;
  var email=req.body.bloodBankEmail;
  mailer(email,message,(info)=>{
    if(info){
      res.render("pages/blood_bank_registration",{blood_bank:"",email:"",otp:"opt sent",wrongotp:""});
    }
    res.render('pages/blood_bank_registration',{blood_bank:blood_bank_data,email:"email not sent try again",otp:"",wrongotp:""});
  });  
}

export const ViewUserController = async (req,res)=>{
  try {
      const result = await Registration.find()
      // console.log(result);
      res.render("viewuser",{userrecord:result});
  } catch (error) {
   
  }
}
export const update_Controller = async (req, res) => {
  console.log("hello");
  try {    
    const result = await Registration.updateOne({ bloodBankEmail: req.body.email },{
      $set: {
        bloodBankname: req.body.bloodbankname,
        ownerNamename: req.body.Ownername,
        ownerContactNo: req.body.Ownercontact,
        bloodBankAddress:req.body.address,
        state: req.body.state,
        city: req.body.city
      }
    });
    console.log("Helloooo");
    console.log("result  ",result);
     const data= await Registration.findOne({ bloodBankEmail: req.body.email })
    res.render("pages/blood_bank_profile",{bloodbank:data,msg :"Updated Successfully.."});
  } catch (error) {
        console.log("Error occur   " +error);
  }
}

export const add_inventory_Controller = async (req, res) => {
  var email = req.params.email;
  console.log(email);
  console.log("add_inventory_controller");
  try {
    const {
      A_plus_unit,
      B_plus_unit,
      AB_plus_unit,
      O_plus_unit,
      A_minus_unit,
      AB_minus_unit,
      O_minus_unit,
      B_minus_unit,
    } = req.body;

    const existingRecord = await blood_bank_inventory.findOne({ email: email });

    if (existingRecord) {

      const result = await blood_bank_inventory.updateOne({ email: email },
        { $set:{
          A_plus_unit: A_plus_unit,
          B_plus_unit: B_plus_unit,
          AB_plus_unit: AB_plus_unit,
          O_plus_unit: O_plus_unit,
          A_minus_unit: A_minus_unit,
          AB_minus_unit: AB_minus_unit,
          O_minus_unit: O_minus_unit,
          B_minus_unit: B_minus_unit,
        }
    });

      console.log("Record updated:", +result);

      const data = await Registration.findOne({ bloodBankEmail: email })
      res.render("pages/blood_bank_profile", { bloodbank: data,msg:"Blood Unit Updated"});
    } else {
      console.log("else");
      const result = await blood_bank_inventory.create({
        A_plus_unit: A_plus_unit,
        B_plus_unit: B_plus_unit,
        AB_plus_unit: AB_plus_unit,
        O_plus_unit: O_plus_unit,
        A_minus_unit: A_minus_unit,
        AB_minus_unit: AB_minus_unit,
        O_minus_unit: O_minus_unit,
        B_minus_unit: B_minus_unit,
        email: email
      });

      if (result) {
        console.log("New record created:", result);
        const data = await Registration.findOne({ bloodBankEmail: email });
        res.render("pages/blood_bank_profile", { bloodbank: data,msg:"Blood Unit Added"});
      } else {
        console.log("Error creating a new record.");
        // Handle the error or send a response to the client
      }
    }
  } catch (error) {
    console.log("Error adding/updating blood unit", error);
  }
};

export const update_bloodbankController = async (req, res,) => {
  var email = req.params.email;
  console.log(email);
  console.log("update_bloodbankController");
  try {
    const record = await blood_bank_inventory.findOne({ email: email });
    console.log(record);

    if (record) {
      res.render('pages/blood_inventory', {email: email,record:record});
    }
    else {
      res.render('pages/blood_inventory', { email: email, record:""});
    }
  } catch (error) {
    console.log("Error adding/updating blood unit", error);
  }
}

export const getlocationController = async (req, res) => {
  const data = url.parse(req.url, true).query;
  console.log('data : ',data);
  const address1 = {
    reciepientlatiude: req.query.latitude,
    reciepientlongitude: req.query.longitude,
  };

  console.log("getlocationController");
  console.log(req.query.city);
  console.log("user current latitude  " + req.query.latitude);
  console.log("user current longitude  " + req.query.longitude);
  console.log("recipient current address  " + req.query.address);

  try {
    const result = await Registration.find({city:data.city});
    console.log("result ",result);
    const emailAddresses = result.map((bloodBank) => bloodBank.bloodBankEmail);
    const matchingBloodBanks = await blood_bank_inventory.find({
      email: { $in: emailAddresses },
      [`${data.bloodgroup}`]: {$gte: data.unit},
    });

    const matchingEmails = matchingBloodBanks.map((bloodBank) => bloodBank.email);
    console.log('email',matchingEmails);
    const matchingAddresses = await Registration.find({
      bloodBankEmail: { $in: matchingEmails }
    });

    const addresses = [];
    const cities = [];
    const states = [];
    const bloodbankname = [];
    const distances = [];

    for (const entry of matchingAddresses) {
      addresses.push(entry.bloodBankAddress);
      cities.push(entry.city);
      states.push(entry.state);
      bloodbankname.push(entry.bloodBankname);
    }

    console.log("Matching Blood Bank Addresses:", matchingAddresses);

    function calculateDistance(lat1, lon1, lat2, lon2) {
      const earthRadius = 6371; // Earth's radius in kilometers
      const dLat = (lat2 - lat1) * (Math.PI / 180);
      const dLon = (lon2 - lon1) * (Math.PI / 180);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return earthRadius * c;
    }

    for (let i = 0; i < addresses.length; i++) {
      getCoordinates(`${addresses[i]}, ${cities[i]}, ${states[i]}`).then((coordinates) => {
        if (coordinates) {
          const distance = calculateDistance(
            address1.reciepientlatiude,
            address1.reciepientlongitude,
            coordinates.latitude,
            coordinates.longitude
          );
          distances[i] = distance;
          console.log(
            `Distance from ${req.query.address} to ${addresses[i]} for ${bloodbankname[i]} Address ${i + 1}: ${distance} km`
          );

          if (i === addresses.length - 1) {
            // Sort matchingAddresses based on the calculated distances in ascending order
            const sortedMatchingAddresses = matchingAddresses
              .map((entry, j) => ({ entry, distance: distances[j] }))
              .sort((a, b) => a.distance - b.distance)
              .map((item) => item.entry);

            // Render the page with the sorted data
            res.render('pages/blood_bank_search', {
              result: sortedMatchingAddresses,
              bloodgroup: data.bloodgroup,
              unit: data.unit,
            });
          }
        } else {
          console.log(`Geocoding failed for Address ${i + 1}`);
        }
      });
    }
  } catch (error) {
    console.error('An error occurred:', error);
    
    res.status(500).send('An error occurred while processing your request.');
  }
};

export const deleteExpiredUnitsController = async (req,res) => {
  try {
    const currentDate = new Date();
    var msg;
    // Find and delete expired blood units
    const deletedBloodUnits = await Add_blood_Unit.deleteMany({ Expiry_Date: { $lte: currentDate } });

    if (deletedBloodUnits.deletedCount > 0) {
      console.log(`Deleted ${deletedBloodUnits.deletedCount} expired blood units.`);
      msg="Expired Blood unit is removed from inventory";
    } else {
      console.log('No expired blood units found.');
      msg="No Blood unit expired";
    }
    const data = await blood_bank_inventory.findOne({email: "dabidipesh7898@gmail.com" });    
    
    data.A_plus_unit -= deletedBloodUnits.deletedCount;
    data.B_plus_unit -= deletedBloodUnits.deletedCount;
    data.AB_plus_unit -= deletedBloodUnits.deletedCount;
    data.O_plus_unit -= deletedBloodUnits.deletedCount;
    data.A_minus_unit -= deletedBloodUnits.deletedCount;
    data.AB_minus_unit -= deletedBloodUnits.deletedCount;
    data.O_minus_unit -= deletedBloodUnits.deletedCount;
    data.B_minus_unit -= deletedBloodUnits.deletedCount;
  
      await data.save();
      console.log('Blood inventory updated successfully.',msg);
      const blood_inventory=await blood_bank_inventory.find({email:"dabidipesh7898@gmail.com"});
      res.render("pages/admin_blood_inventory",{userrecord:blood_inventory,msg:msg});          
    // res.render('pages/index1',{bloodgroup:"",available:"",notavailable:""});

  } catch (error) {
    console.error("Error deleting expired blood units:", error);
  }
};