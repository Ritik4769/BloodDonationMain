function validateForm() {
    var valid = true; // Initialize a variable to track overall validation

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var pass = document.getElementById("pass").value;
    var cpass = document.getElementById("cpass").value;
    var age = document.getElementById("age").value;
    var male = document.getElementById("male");
    var female = document.getElementById("female");
    var contact = document.getElementById("contact").value;
    var state = document.getElementById("state").value;
    var city = document.getElementById("city").value;
    var address = document.getElementById("add").value;
    var zip = document.getElementById("zip").value;

    // Validation logic for the name field
    if (name.trim() === "") {
        Name_display.innerHTML = "Username Required";
        Name_display.style.color = "red";
        valid = false; // Set valid to false if validation fails
    } else {
        var reg = /^[A-Za-z_]+$/;
        if (reg.test(name)) {
            Name_display.innerHTML = "Valid";
            Name_display.style.color = "green";
        } else {
            Name_display.innerHTML = "Invalid";
            Name_display.style.color = "purple";
            valid = false; // Set valid to false if validation fails
        }
    }

    // Validation logic for the email field
    if (email.trim() === "") {
        Email_display.innerHTML = "Email Required";
        Email_display.style.color = "red";
        valid = false;
    } else {
        var reg = /^[0-9A-Za-z_]+@[a-z]+\.\edu\.[a-z]{2,3}$/;
        if (reg.test(email)) {
            Email_display.innerHTML = "Valid";
            Email_display.style.color = "green";
        } else {
            Email_display.innerHTML = "Invalid";
            Email_display.style.color = "purple";
            valid = false;
        }
    }

    // Validation logic for the password field
    if (pass.trim() === "") {
        Pass_display.innerHTML = "Password Required";
        Pass_display.style.color = "red";
        valid = false;
    } else {
        var reg = /^(?=.+?[0-9])(?=.+?[A-Z])(?=.+?[a-z])(?=.+?[~!@#$%^&*()_+]).{8}$/;
        if (reg.test(pass)) {
            Pass_display.innerHTML = "Valid";
            Pass_display.style.color = "green";
        } else {
            Pass_display.innerHTML = "Invalid";
            Pass_display.style.color = "purple";
            valid = false;
        }
    }

    // Validation logic for confirming password
    if (cpass.trim() === "") {
        Cpass_display.innerHTML = "Confirm Password Required";
        valid = false;
    } else {
        var password = document.getElementById("pass").value;
        if (password.trim() === "") {
            Cpass_display.innerHTML = "Password Field is Empty";
            Cpass_display.style.color = "crimson";
            valid = false;
        } else {
            if (cpass === password) {
                Cpass_display.innerHTML = "Password Matched";
                Cpass_display.style.color = "green";
            } else {
                Cpass_display.innerHTML = "Password does not Match";
                Cpass_display.style.color = "red";
                valid = false;
            }
        }
    }

    // Validation logic for age
    if (age.trim() === "") {
        Age_display.innerHTML = "Age Required";
        Age_display.style.color = "red";
        valid = false;
    } else {
        if (isNaN(age) || age <= 0) {
            Age_display.innerHTML = "Invalid Age";
            Age_display.style.color = "purple";
            valid = false;
        } else {
            var reg = /^[1-9]+$/;
            if (reg.test(age)) {
                Age_display.innerHTML = "Valid";
                Age_display.style.color = "green";
            } else {
                Age_display.innerHTML = "Invalid";
                Age_display.style.color = "purple";
                valid = false;
            }
        }
    }

    // Validation logic for gender
    if (!male.checked && !female.checked) {
        Gen_display.innerHTML = "Gender Required";
        valid = false;
    } else {
        Gen_display.innerHTML = "";
    }

    // Validation logic for contact
    if (contact.trim() === "") {
        Con_display.innerHTML = "Contact Required";
        Con_display.style.color = "red";
        valid = false;
    } else {
        var reg = /^[6789][0-9]{9}$/;
        if (reg.test(contact)) {
            Con_display.innerHTML = "Valid";
            Con_display.style.color = "green";
        } else {
            Con_display.innerHTML = "Invalid";
            Con_display.style.color = "purple";
            valid = false;
        }
    }

    // Validation logic for state
    if (state === "") {
        State_display.innerHTML = "State Required";
        valid = false;
    } else {
        State_display.innerHTML = "";
    }

    // Validation logic for city
    if (city === "") {
        City_display.innerHTML = "City Required";
        valid = false;
    } else {
        City_display.innerHTML = "";
    }

    // Validation logic for address
    if (address.trim() === "") {
        Add_display.innerHTML = "Address Required";
        valid = false;
    } else {
        Add_display.innerHTML = "";
    }

    // Validation logic for zip code
    if (zip.trim() === "") {
        Zip_display.innerHTML = "Zip Code Required";
        valid = false;
    } else {
        Zip_display.innerHTML = "";
    }

    // Return the overall validity
    return valid;
}
