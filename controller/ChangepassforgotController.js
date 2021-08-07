const password_request_db = require('../models/password_change_requests');
const dbuser = require('../models/nguoidung');
const bcrypt = require('bcrypt');
const saltRounds = 10;
class ChangepassforgotController {

    async getChangepassforgotControllerPage(req, res, next) {

        const findtoken = await password_request_db.findOne({ where: { verify_token: req.params.token, email: req.params.email } });
        if (findtoken === null) {
            req.flash('error', 'We were unable to find this user')
            res.redirect('/RegAndLogin')
            console.log('Not found!');
        } else {
            // true
            var datenow = new Date();
            var datetoken = findtoken.token_expires
            if (datenow > datetoken) {
                req.flash('error', 'token is expired')
                res.redirect('/RegAndLogin')
            } else {
                const user = await dbuser.findOne({ where: { email: req.params.email } })

                if (!user) {
                    req.flash('error', 'We were unable to find this user')
                    console.log('We were unable to find this user ');
                    res.redirect('/RegAndLogin')

                } else {
                    res.render('../views/login/changePassword.ejs')
                        // user.isverify = true;
                        // await user.save().then(function(params) {
                        //     req.session.verify = 'Your account has been successfully verified';
                        //     console.log(req.session.verify);
                        // })

                }
            }
        }
    }
    async changepassword(req, res, next) {
        var email = req.params.email
        const { New_password, Confirm_password } = req.body;
        if (New_password === Confirm_password) {
            const changepassword = await dbuser.findOne({ where: { email: req.params.email } });
            if (changepassword) {
                var hashpassword = await passwordhashed(New_password);
                changepassword.matkhau = hashpassword;
                const save = await changepassword.save()
                if (save) {
                    const findtoken = await password_request_db.findOne({ where: { verify_token: req.params.token, email: req.params.email } })
                    findtoken.destroy();
                    req.flash('success', 'password changed successfully')
                    res.redirect("/RegAndLogin")
                }

            }
        }
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
module.exports.ChangepassforgotController = ChangepassforgotController