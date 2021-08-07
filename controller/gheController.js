
class gheController {
    async getghePage(req, res, next) {
        await phong.findAll();
       
        res.render('../views/ghe/chonghe')
    }

}
module.exports = gheController