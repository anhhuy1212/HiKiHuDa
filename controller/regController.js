const db = require('../models/nguoidung');
const dbverifiy = require('../models/verification');
const bcrypt = require('bcrypt');
var mailer = require('../lib/nodemailer');
var crypto = require('crypto');
const saltRounds = 10;
class regController {

    async Register(req, res, next) {

        try {
            console.log(req.body);
            const { name, email, password } = req.body;
            const checkExists = await db.findOne({ where: { email: email } })
            if (checkExists) { req.flash('error', 'email already exists'); throw new Error("can't add user to database") }
            let hashpassword = '';
            hashpassword = await passwordhashed(password);
            const AddUser = await db.adduser(name, email, hashpassword, 1)
            if (!AddUser) { throw new Error("can't add user to database") };


            const token = crypto.randomBytes(16).toString('hex');
            const addtoken = await dbverifiy.create({ email: email, verify_token: token });
            if (!addtoken) { throw new Error("can't add token  to database") };

            mailer({
                from: '"Hikihuda" <Hikihuda@gmail.com>',
                to: email,
                subject: 'Verify your account',
                text: 'Hello ' + name + ',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + email + '\/' + token + '\n\nThank You!\n'

            });
            req.flash('success', 'please verify your account in email')

        } catch (error) {
            console.error(error);

        } finally {
            res.redirect('/RegAndLogin')
        }

    }


}
db.adduser = async function(name, email, password, vaitro) {
    var userReturn = null;
    try {
        userReturn = await db.findOrCreate({
            where: {
                hoten: name,
                email: email,
                matkhau: password,

            },
            defaults: {
                matkhau: password,
                vaitro: vaitro


                //properties to be created 
            }
        })
    } catch (err) {
        console.error(err);
    } finally {
        return userReturn;
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
module.exports.regController = regController