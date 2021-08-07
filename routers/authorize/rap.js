const express = require('express');
const router = express.Router();


const cumrapController = require("../../controller/cumrapController");
const controller = new cumrapController


router.get('/', controller.getcumrapPage);

module.exports = router;