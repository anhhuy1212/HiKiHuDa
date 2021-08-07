const express = require('express');
const router = express.Router();
const db = require('../../models/verification');

const dbuser = require('../../models/nguoidung');
router.get('/:email/:token', async(req, res) => {

    const findtoken = await db.findOne({ where: { verify_token: req.params.token } });
    if (findtoken === null) {
        console.log('Not found!');
    } else {
        // true
        console.log(findtoken.verify_token); // 'My Title'
        const user = await dbuser.findOne({ where: { email: req.params.email } })
        console.log(user.email);
        if (!user) {
            req.session.verify = 'We were unable to find a user for this verification. Please SignUp!';

        } else if (user.isVerify) {

            req.session.verify = 'User has been already verified. Please Login';
        } else {
            user.isverify = true;
            await user.save().then(function(params) {
                req.session.verify = 'Your account has been successfully verified';
                console.log(req.session.verify);
            })

        }

    }

    res.redirect('/');
});
module.exports = router;