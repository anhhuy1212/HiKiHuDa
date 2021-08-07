class LogoutController {
    getLogoutPage(req, res, next) {
        req.logout();
        res.redirect('/');
    }

}
module.exports.LogoutController = LogoutController