const nguoidung = require('../models/nguoidung');
const bcrypt = require('bcrypt');
const ve = require('../models/ve');
const rap = require('../models/rap');
const datcho = require('../models/datcho')
const saltRounds = 10;
class profileController {
    async getprofilePage(req, res, next) {
        const profile1 = await nguoidung.profile(req.user.id);

        /* listorrder.forEach(function(value, index){ 
            console.log(value.maghe);
            [value.datcho].forEach(function(item, index){ 
               
                console.log(item.suatchieu.phim.ten);
                console.log(item.suatchieu.ngaychieu);
                console.log(item.suatchieu.batdau);
                console.log(item.suatchieu.rap.ten);
         

            });
        }); */
        const history = await datcho.listdatcho(req.user.id);
        /* console.log(history); */
        res.render('../views/info/profile', { profile1, history });
    }
    async getprofileOrder(req, res, next) {
        const listorrder = await ve.getlichsu(req.user.id, req.params.idorder);

        console.log(listorrder);
        res.render('../views/info/detailorder', { listorrder });
    }
    async update(req, res, next) {
        const username = req.body.inputUsername;
        const email = req.body.inputEmail;
        const address = req.body.inputAddress;
        const phone = req.body.inputPhone;
        console.log(req.body);
        await nguoidung.updateuser(req.user.id, username, email, phone, address);
        const profile1 = await nguoidung.profile(req.user.id);
        res.render('../views/info/profile', { profile1 });
    }


    async updatepass(req, res, next) {
        const { curPassword, password, confirmpassword } = req.body;
        const checkcurrentpass = bcrypt.compareSync(curPassword, req.user.matkhau);
        if (checkcurrentpass == false) {
            return req.flash('error', "incorrect password")
        } else {
            if (password == confirmpassword) {
                const user = await nguoidung.findByPk(req.user.id);
                const hash = await passwordhashed(confirmpassword)
                user.matkhau = hash;
                await user.save();
            } else {
                return req.flash('error', "incorrect confirm password")
            }
        }
        res.redirect('/')
    }
}

async function passwordhashed(password) {
    var hash = null;
    try {
        const salt = bcrypt.genSaltSync(saltRounds);
        hash = bcrypt.hashSync(password, salt);
    } catch (error) {
        console.error(error);
    } finally {
        return hash

    }

}
module.exports = profileController