const suatchieu = require('../models/suatchieu');
class SuatChieuController {
    async getsuatchieuPage(req, res) {
       await suatchieu.findAll();
        res.render('../views/cumrap/pagesuatchieu');
    }
}
module.exports = SuatChieuController