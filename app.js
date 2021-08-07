const express = require('express');
const app = express();
var expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
var cookieSession = require('cookie-session')
var flash = require('connect-flash');
require('dotenv').config()
const db = require('./models/db');

// const dangnhap = require('./routers/authorize/login');
// const dangki = require('./routers/authorize/reg');
const quenmatkhau = require('./routers/authorize/forgotpassword');
const dangkidangnhap = require('./routers/authorize/RegAndLogin');
const dangxuat = require('./routers/authorize/logout')
const ConfirmationRouter = require('./routers/authorize/confirmation');
const profile = require('./routers/authorize/profile');
const cumrapPage = require('./routers/Cumrap/rap');
const rap = require('./routers/Cumrap/Rapphim');
const phimPage = require('./routers/Cumrap/detail');
const ghePage = require('./routers/ghe/chonghe');
const hethongrap = require('./routers/hethongrap');
const cumrap = require('./routers/Cumrap/Hethongrap')
const thaydoipassbiquen = require('./routers/authorize/changepassforgot')
const suatchieu = require('./routers/Cumrap/Suatchieu');
const loginbyfacebook = require('./routers/authorize/loginbyfacebook')
    //cookie
const thongbao = require('./routers/Cumrap/thongbao');
const adminpage = require('./routers/Admin/admin');
//cookie
app.use(cookieSession({
        name: 'session',
        keys: ['123'],
        maxAge: 24 * 60 * 60 * 1000
    }))
    //middlewares

//ejs
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressLayouts);

var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
require('./controller/loginController').localLogin(passport, Strategy)
require('./lib/loginbyfacebook')(passport, FacebookStrategy);
app.use(passport.initialize());
app.use(passport.session());
const authenticateUser = require("./middlewares/authenticateUser");
app.use(authenticateUser);
app.use(flash());
app.use('/RegAndLogin', dangkidangnhap);
app.use('/RegAndLogin/signup-complete', dangkidangnhap);
app.use('/RegAndLogin/login-success', dangkidangnhap);
app.use('/confirmation', ConfirmationRouter);
app.use('/logout', dangxuat);
app.use('/forgot', quenmatkhau);
app.use('/changepassforgot', thaydoipassbiquen);
app.use('/', loginbyfacebook);
//
app.use('/info', profile);
app.use('/cumrap', cumrapPage);
app.use('/phim', phimPage);
app.use('/ghe', ghePage);
app.use('/suatchieu', suatchieu);
app.use('/bbb', cumrap);
app.use('/ccc', rap);
app.use('/thongbao', thongbao);
app.use('/', adminpage);
//
app.use('/hethongrap', hethongrap);


//css
var path = require('path');
// const { session } = require('passport');
app.use(express.static(path.join(__dirname, 'public')));
//

app.get('/', async function(req, res) {
    const phim = require('./models/phim');
    const sapchieu = await phim.sapchieu();
    const dangchieu = await phim.dangchieu();
    const top = await phim.top4();
    res.render('homepage/index',{sapchieu,dangchieu,top});
})
db.sync().then(function() {


}).catch(console.error);
module.exports = app;