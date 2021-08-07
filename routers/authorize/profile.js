const express = require('express');
const router = express.Router();


const profileController = require("../../controller/profileController");
const controller = new profileController

router.get('/profile', function(req, res) {
    res.render('info/profile')



});
router.get('/madonhang/:idorder', controller.getprofileOrder);

router.get('/', controller.getprofilePage);
router.post('/', controller.update);
router.post('/updatepassword', controller.updatepass);
module.exports = router;