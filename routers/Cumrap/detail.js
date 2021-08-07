const express = require('express');
const router = express.Router();

// const detailController = require("../../controller/cumrapController");
const detailController = require("../../controller/detailController");
const controller = new detailController

router.get('/', controller.getdetailPage);
router.get('/chitiet/:id', controller.getdetailPage);
module.exports = router;