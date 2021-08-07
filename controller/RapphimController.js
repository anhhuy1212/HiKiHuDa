const rap = require('../models/rap');
class RapphimController {
    async getrapphimPage(req, res) {
        await rap.findAll();
         res.render('../views/');
     }
}
module.exports = RapphimController