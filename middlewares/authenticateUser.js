module.exports = (req, res, next) => {
    // middleware code here
    if (req.user) {

        req.currentUser = req.user
        res.locals.user = req.user
    }
    next();
}