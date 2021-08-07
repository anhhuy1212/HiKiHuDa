var mailer = require('../lib/nodemailer');
var crypto = require('crypto');
const password_request_db = require('../models/password_change_requests');
class forgotController {
    getForgotPage(req, res, next) {
        res.render('../views/login/Forgot.ejs')
    }
    async addTokenAndSendEmail(req, res, next) {
        const { email } = req.body;
        const token = crypto.randomBytes(16).toString('hex');
        let date_ob = new Date();
        date_ob.setHours(date_ob.getHours() + 24)
        const addtoken = await password_request_db.create({ email: email, verify_token: token, token_expires: date_ob });
        if (!addtoken) { throw new Error("can't add token  to database") };

        mailer({
            from: "Hikihuda",
            to: email,
            subject: 'Change your password',
            text: '\n\n' + 'Change your password by clicking the link: \nhttp:\/\/' + req.headers.host + '\/changepassforgot\/' + email + '\/' + token + '\n\nThank You!\n'
        });
        req.flash('success', 'please check email')
        res.redirect('/RegAndLogin')
    }

}
module.exports.forgotController = forgotController