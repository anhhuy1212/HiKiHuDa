const express = require('express');
const router = express.Router();


const ChangepassforgotController = require("../../controller/ChangepassforgotController");
const controller = new ChangepassforgotController.ChangepassforgotController
router.get('/:email/:token', controller.getChangepassforgotControllerPage);
router.post('/:email/:token', controller.changepassword);
module.exports = router;