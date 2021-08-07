const express = require('express');
const router = express.Router();
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
//login
const loginController = require("../../controller/loginController");
const logincontroller = new loginController.loginController

//reg
const regController = require("../../controller/regController");
const regcontroller = new regController.regController

router.get('/', logincontroller.getLoginAndRegPage);
loginController.localLogin(passport, Strategy)
router.post('/login-success', passport.authenticate('local', { successReturnToOrRedirect: '/', failureRedirect: '/RegAndLogin', failureFlash: true }));
router.post('/signup-complete', regcontroller.Register);

module.exports = router;