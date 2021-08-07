const cumrap = require('../models/cumrap');
class HethongrapController {
    async gethethonguPage(req, res) {
        await cumrap.findAll();
         res.render('../views/');
     }
}
module.exports = HethongrapController