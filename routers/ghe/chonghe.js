const express = require('express');
const router = express.Router();


const gheController = require("../../controller/gheController");
const controller = new gheController
router.get('/', controller.getghePage);

module.exports = router;