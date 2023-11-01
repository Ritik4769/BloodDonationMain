// user registration start
const checkUsername = () => {
    let name = document.getElementById('name');

    let valid = false;
    const min = 3,
        max = 25;

    const uname = name.value.trim();

    if (!isRequired(uname)) {
        showError(name, 'Username cannot be blank.');
    } else if (!isBetween(uname.length, min, max)) {
        showError(name, `Username must be between ${min} and ${max} characters.`)
    } else if (!isValidname(uname)) {
        showError(name, 'Username is not valid.')
    }else {
        showSuccess(name);
        valid = true;
    }
    return valid;
};



const checkEmail = () => {
    let email = document.getElementById('email');
    let valid = false;
    const uemail = email.value.trim();
    if (!isRequired(uemail)) {
        showError(email, 'Email cannot be blank.');
    } else if (!isEmailValid(uemail)) {
        showError(email, 'Email is not valid.')
    } else {
        showSuccess(email);
        valid = true;
    }
    return valid;
};



function checkPassword(){
    let pass = document.getElementById('pass');

    let valid = false;
    let password = pass.value.trim();

    if(!isRequired(password)){
        showError(pass, 'password cannot be blank.');
    }
    else if(!isValidPassword(password)){
        showError(pass, 'invalid password.');
    }
    else{
        showSuccess(pass);
        valid = true;
    }
    return valid;
}



function checkConfirmPassword()
{
    let pass = document.getElementById('pass').value;
    let cpass = document.getElementById('cpass');
    let valid = false;
    let password = cpass.value.trim();

    if(!isRequired(password)){
        showError(cpass, 'password cannot be blank.');
    }
    else if(password!=pass){
        showError(cpass, 'invalid password.');
    }
    else{
        showSuccess(cpass);
        valid = true;
    }
    return valid;
}

function checkAge()
{
    let age = document.getElementById('age');

    let valid = false;
    let uage = age.value.trim();

    if(!isRequired(uage)){
        showError(age, 'age cannot be blank.');
    }
    else if(!isValidAge(uage)){
        showError(age, 'invalid age.');
    }
    else{
        showSuccess(age);
        valid = true;
    }
    return valid;
}


function checkGender()
{
    var male = document.getElementById("male");
    var female = document.getElementById("female");
    let valid = false;
    if(male.checked==false && female.checked==false){
        showError(male, 'gender cannot be blank.');
    }
    else{
        showSuccess();
        valid = true;
    }
    return valid;
}

const checkContact = ()=>{
    let contact = document.getElementById('contact');
    let valid = false;
    let ucontact = contact.value.trim();

    if(!isRequired(ucontact)){
        showError(contact,"Contact number connot be blank.")
    }
    else if(!isValidContact(ucontact)){
        showError(contact,'Invalid contact number.')
    }
    else{
        showSuccess(contact);
        valid = true;
    }
    return valid;
}




function checkState(){
    let state = document.getElementById('sts');
    let valid = false;
    let ustate = state.value.trim();

    if(!isRequired(ustate)){
        showError(state,'state cannot be blank')
    }
    else{
        showSuccess(state);
        valid = true;
    }
    return valid;
}

function checkCity(){
    let city = document.getElementById('city');
    let valid = false;
    let ucity = city.value.trim();

    if(!isRequired(ucity)){
        showError(city,'city cannot be blank')
    }
    else{
        showSuccess(city);
        valid = true;
    }
    return valid;
}

function checkBloodGroup(){
    let bloodGroup = document.getElementById('bloodGroup');
    let valid = false;
    let ubloodGroup = bloodGroup.value.trim();

    if(!isRequired(ubloodGroup)){
        showError(bloodGroup,'blood group cannot be blank')
    }
    else{
        showSuccess(bloodGroup);
        valid = true;
    }
    return valid;
}


function checkLastDonDate(){
    let last_donation_date = document.getElementById('last_donation_date');
    let valid = false;
    let ulast_donation_date = last_donation_date.value.trim();

    if(!isRequired(ulast_donation_date)){
        showError(last_donation_date,'last donation date cannot be blank')
    }
    else{
        showSuccess(last_donation_date);
        valid = true;
    }
    return valid;
}

// user registration end


// blood bank registration start


const checkBloodbankname = () => {
    let bloodBankName = document.getElementById('bloodBankName');
    let valid = false;
    const min = 3,
        max = 25;

    const uname = bloodBankName.value.trim();

    if (!isRequired(uname)) {
        showError(bloodBankName, 'blood bank name cannot be blank.');
    } else if (!isBetween(uname.length, min, max)) {
        showError(bloodBankName, `blood bank name must be between ${min} and ${max} characters.`)
    } else if (!isValidname(uname)) {
        showError(bloodBankName, 'blood bank name is not valid.')
    }else {
        showSuccess(bloodBankName);
        valid = true;
    }
    return valid;
};



const checkOwnername = () => {
    let ownerName = document.getElementById('ownerName');

    let valid = false;
    const min = 3,
        max = 25;

    const uname = ownerName.value.trim();

    if (!isRequired(uname)) {
        showError(ownerName, 'Owner name cannot be blank.');
    } else if (!isBetween(uname.length, min, max)) {
        showError(ownerName, `Owner name must be between ${min} and ${max} characters.`)
    } else if (!isValidname(uname)) {
        showError(ownerName, 'Owner name is not valid.')
    }else {
        showSuccess(ownerName);
        valid = true;
    }
    return valid;
};



function checkbloodBankCategory(){
    let bloodBankCategory = document.getElementById('bloodBankCategory');
    let valid = false;
    let ubloodBankCategory = bloodBankCategory.value.trim();

    if(!isRequired(ubloodBankCategory)){
        showError(bloodBankCategory,'category cannot be blank')
    }
    else{
        showSuccess(bloodBankCategory);
        valid = true;
    }
    return valid;
}

function checkLicenceNUmber(){
    let licenseNumber = document.getElementById('licenseNumber');
    console.log('',licenseNumber.value);
    let valid = false;
    let input_licence_number = licenseNumber.value.trim();

    if(!isRequired(input_licence_number)){
        showError(licenseNumber, 'Licence number cannot be blank.');
    }
    else if(!isValidLicenceNumber(input_licence_number)){
        showError(licenseNumber, 'Licence number is not valid.')
    }
    else{
        showSuccess(licenseNumber);
        valid = true;
    }
    return valid;
}



const checkparentHospital = () => {
    let parentHospital = document.getElementById('parentHospital');

    let valid = false;
    const min = 3,
        max = 25;

    const uname =parentHospital.value.trim();

    if (!isRequired(uname)) {
        showError(parentHospital, 'parentHospital name cannot be blank.');
    } else if (!isBetween(uname.length, min, max)) {
        showError(parentHospital, `parentHospital name must be between ${min} and ${max} characters.`)
    } else if (!isValidname(uname)) {
        showError(parentHospital, 'parentHospital name is not valid.')
    }else {
        showSuccess(parentHospital);
        valid = true;
    }
    return valid;
};



function checkopeningTime(){
    let openingTime = document.getElementById('openingTime');
    let valid = false;
    let ustate = openingTime.value.trim();

    if(!isRequired(ustate)){
        showError(openingTime,'openingTime cannot be blank')
    }
    else{
        showSuccess(openingTime);
        valid = true;
    }
    return valid;
}
function checkclosingTime(){
    let closingTime = document.getElementById('closingTime');
    let valid = false;
    let ustate = closingTime.value.trim();

    if(!isRequired(ustate)){
        showError(closingTime,'closingTime cannot be blank')
    }
    else{
        showSuccess(closingTime);
        valid = true;
    }
    return valid;
}

const checkdays = () => {
    let days = document.getElementsByName('days');
};



const bloodEmail = () => {
    console.log("error");
    let bloodBankEmail = document.getElementById('bloodBankEmail');
    let valid = false;
    const uemail = bloodBankEmail.value.trim();
    if (!isRequired(uemail)) {
        showError(bloodBankEmail, 'Email cannot be blank.');
    } else if (!isEmailValid(uemail)) {
        showError(bloodBankEmail, 'Email is not valid.')
    } else {
        showSuccess(bloodBankEmail);
        valid = true;
    }
    return valid;
};


function ownerContactNumber(){
    let ownerContactNumber = document.getElementById('ownerContactNumber');
    let valid = false;
    let ucontact = ownerContactNumber.value.trim();

    if(!isRequired(ucontact)){
        showError(ownerContactNumber,"Contact number connot be blank.")
    }
    else if(!isValidContact(ucontact)){
        showError(ownerContactNumber,'Invalid contact number.')
    }
    else{
        showSuccess(ownerContactNumber);
        valid = true;
    }
    return valid;
}

function bloodBankAddress(){
    let bloodBankAddress = document.getElementById('bloodBankAddress');
    let valid = false;
    let ubloodBankAddress = bloodBankAddress.value.trim();

    if(!isRequired(ubloodBankAddress)){
        showError(bloodBankAddress,'blood Bank Address cannot be blank')
    }
    else{
        showSuccess(bloodBankAddress);
        valid = true;
    }
    return valid;
}
function checkZipcode(){
    let zipcode = document.getElementById('zipcode');
    let valid = false;
    let uzipcode = zipcode.value.trim();

    if(!isRequired(uzipcode)){
        showError(zipcode,"Contact number connot be blank.")
    }
    else if(!isValidzipcode(uzipcode)){
        showError(zipcode,'Invalid contact number.')
    }
    else{
        showSuccess(zipcode);
        valid = true;
    }
    return valid;
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------


const isRequired = (value) => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;

function showError(input, message){
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
}


function showSuccess(input){
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}


// --------------------------------------------------------------------------------------------------------------------------------------------------------


const isEmailValid = (uemail) => {
    const res =  /^\w+([\.-])?\w*@[a-z]*([\.][a-z]{2,3})+$/;
    return res.test(uemail);
};

function isValidname(uname){
    var res = /^[A-Za-z '-]+$/;
    return res.test(uname);
}

function isValidContact(ucontact){
    var res = /^[6-9]\d{9}$/;
    return res.test(ucontact);
}

function isValidAge(uage){
    const res = /^\d{1,3}$/;
    return res.test(uage);
}
function isValidPassword(password){
    const res =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return res.test(password);
}
function isValidDays(uname){
    var res = /^[A-Za-z '-]+$/;
    return res.test(uname);
}

function isValidzipcode(uzipcode){
    var res = /^[1-9]\d{5}$/;
    return res.test(uzipcode);
}
function isValidAge(uage){
    const res = /^\d{1,3}$/;
    return res.test(uage);
}
const isValidLicenceNumber = (licenseNumber)=>{
    const res = /^[A-Z]{2}-\d{4}-\d{2}$/;
    return res.test(licenseNumber);
}

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function checkDetails(){
    if(checkUsername() && checkEmail() && checkPassword() && checkConfirmPassword()&& checkAge() && checkGender() && checkContact()&&checkState()&&checkCity()){
        return true;
    }
    else{
        checkUsername();checkEmail();checkPassword();checkConfirmPassword();checkAge();checkGender();checkContact();checkState();checkCity();checkBloodGroup();checkLastDonDate()
    return false;
    }
}
function checkBloodBankDetails()
{
    if(checkBloodbankname() && checkOwnername() && checkbloodBankCategory() && checkLicenceNUmber() && checkparentHospital() && checkopeningTime()&& checkclosingTime() && checkdays() && bloodEmail() && ownerContactNumber() && bloodBankAddress() && checkZipcode()&&checkPassword()&&checkConfirmPassword())
    {
        return true;
    }
    else{
        checkBloodbankname();
        checkOwnername ();
        checkbloodBankCategory();
        checkLicenceNUmber();
        checkparentHospital();
        checkopeningTime();
        checkclosingTime();
        checkdays();
        bloodBankEmail();
        ownerContactNumber();
        bloodBankAddress();
        checkZipcode();
        return false;
    }
}


