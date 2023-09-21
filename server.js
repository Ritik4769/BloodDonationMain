var express = require('express');
var app = express();
var port = 3000;
app.set('view engine', 'ejs');
app.use(express.static('public'));
const donorroute = require('./Routes/donor');
const adminroute = require('./Routes/admin');
const recipientroute = require('./Routes/Recipient');
const organizationroute = require('./Routes/Organization');
const bloodroute = require('./Routes/BloodBank');
app.use('', donorroute);
app.use('', adminroute);
app.use('', recipientroute);
app.use('', organizationroute);
app.use('', bloodroute);
app.listen(port, () => {
  console.log(`Server is listening on port : http://localhost:${port}`);
});

// set the view engine to ejs

// use res.render to load up an ejs view file
// index page
// app.get('/', function (req, res) {
//   res.render('pages/index');
// });

// about page
// app.get('/about', function (req, res) {
//   res.render('pages/about');
// });


// app.get('/services', function (req, res) {
//   res.render('pages/services');
// });

// app.get('/DonorProfile', function (req, res) {
//   res.render('pages/DonorProfile');
// });
// app.get('/RecipientProfile', function (req, res) {
//   res.render('pages/RecipientProfile');
// });
// app.get('/RegistrationForm', function (req, res) {
//   res.render('pages/RegistrationForm');
// });
// app.get('/OrganisationProfile', function (req, res) {
//   res.render('pages/OrganisationProfile');
// });
