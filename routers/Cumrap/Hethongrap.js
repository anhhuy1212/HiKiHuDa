const express = require('express');
const router = express.Router();


const detailController = require("../../controller/HethongrapController");
const controller = new detailController
router.get('/', controller.gethethonguPage);
module.exports = router;