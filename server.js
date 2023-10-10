import express from 'express';
import connection from './model/connection.js';
import bodyparser from 'body-parser';
import cookieparser from 'cookie-parser';
import indexroute from './Routes/home.js';
import adminroute from './Routes/admin.js';
import userroute  from './Routes/user.js';
import organizationroute from './Routes/Organization.js';
import bloodroute from './Routes/BloodBank.js';
import loginroute from './Routes/login.js';
var app = express();
var port = 3000;
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(cookieparser());

app.use(bodyparser.urlencoded({extended:true}));
app.use('/',indexroute);
app.use('/admin', adminroute);
app.use('/user', userroute);
app.use('/organization', organizationroute);
app.use('/blood_bank', bloodroute);
app.use('/login',loginroute);
app.listen(port, () => {
  console.log(`Server is listening on port : http://localhost:${port}`);
  console.log("connection ",connection);
});


