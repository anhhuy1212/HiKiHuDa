module.exports = (req, res, next) => {
    // middleware code here
    if (req.user.vaitro != 2) {
        res.redirect('/');
    }
    next();
}