const express = require('express');
const router = express.Router();


const LogoutController = require("../../controller/LogoutController");
const controller = new LogoutController.LogoutController
router.get('/', controller.getLogoutPage);

module.exports = router;