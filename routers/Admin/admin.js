const express = require('express');
const router = express.Router();

const AdminController = require("../../controller/AdminController");
const suatchieu = require('../../models/suatchieu');
const datcho = require('../../models/datcho');
const controller = new AdminController.AdminController

router.get('/admin', controller.getadminPage);
router.post('/admin/addSuatrap', controller.Addsuatchieu);

router.get('/admin/:id/done', controller.deletesuatchieu);

router.get('/1', controller.getcumrapPage);
router.get('/1/:id/done', controller.deletecumrap);
router.post('/1/addCumrap', controller.Addcumrap);

router.get('/2', controller.getrapPage);
router.post('/2/addRap', AdminController.uploadFileRap, controller.Addrap);
router.get('/2/:id/done', controller.deleterap);

router.get('/3', controller.getphimPage);
router.get('/3/:id/done', controller.deletephim);
router.post('/3/addPhim', AdminController.uploadFilePhim, controller.AddPhim);

router.get('/4', controller.getdoangthuPage);
router.get('/5', controller.getdoangthuphim);
router.post('/4', controller.postdoangthuPage);
router.post('/5', controller.postdoangthuphim);


module.exports = router;