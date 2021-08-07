const db = require('../models/nguoidung');
const dbverfication = require('../models/verification');
const bcrypt = require('bcrypt');
const saltRounds = 10;


class loginController {
    getLoginAndRegPage(req, res, next) {
        console.log('req.user:' + req.user)
        res.render('../views/login/SignIn_SignUp', { message: req.flash('error'), messagesucess: req.flash('success') })
    }
    async AuthLogin(req, res, next) {

    }

}

module.exports.localLogin = async function(passport, Strategy) {
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        async function(req, email, password, done) {
            var user = null;
            try {
                user = await db.findOne({ where: { email: email } });
                if (!user) { return done(null, false, { message: 'Incorrect username.' }); }
                if (!bcrypt.compareSync(password, user.matkhau) || user.isverify === false) { return done(null, false, { message: 'Incorrect password.' }); }
                return done(null, user);
            } catch (error) {
                { return done(error); }
            }
        }))
    passport.serializeUser(function(user, cb) {
        cb(null, user.id);
    });

    passport.deserializeUser(async function(id, cb) {


        var user = null
        try {
            user = await db.findByPk(id)
            cb(null, user);

        } catch (error) {
            return cb(error);
        }
    });
}



module.exports.loginController = loginController