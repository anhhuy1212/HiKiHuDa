const express = require('express');
const router = express.Router();
const db = require('../../models/password_change_requests');
const forgotController = require("../../controller/forgotController");
const controller = new forgotController.forgotController


router.get('/', controller.getForgotPage);
router.post('/', controller.addTokenAndSendEmail);
module.exports = router;