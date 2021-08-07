const express = require('express');
const router = express.Router();


const detailController = require("../../controller/RapphimController");
const controller = new detailController
router.get('/', controller.getrapphimPage);
module.exports = router;