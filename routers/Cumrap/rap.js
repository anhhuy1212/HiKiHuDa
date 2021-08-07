const express = require('express');

const router = express.Router();
const phim = require('../../models/phim');
const cumrapController = require("../../controller/cumrapController");
const controller = new cumrapController

router.get('/', controller.getcumrapPage);
router.get('/chieu', controller.getnotice);
router.get('/chitiet/:id', controller.getdetailPage);
router.get('/suatchieu', controller.getsuatchieu);
router.post('/', controller.getphim);

router.get('/chitiet/:id/sc/:schieu/marap/:idcinema/ngay/:date/gio/:time/phong/:phong', controller.getseat);

router.post('/chitiet/:id/sc/:schieu/marap/:idcinema/ngay/:date/gio/:time/phong/:phong', controller.themdatcho);

module.exports = router;