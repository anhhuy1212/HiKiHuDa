const express = require('express');
const router = express.Router();


const detailController = require("../../controller/SuatChieuController");
const controller = new detailController
router.get('/', controller.getsuatchieuPage);
module.exports = router;