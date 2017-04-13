/**
 * Created by lelabo on 11/04/17.
 */
var express = require('express');
var app     = express();
var router  = express.Router();
var jwt     = require('jsonwebtoken');
var User    = require('../models/user');
var config  = require('../config');
var passwordHash = require('password-hash');

// User listing
// (POST http://localhost:8080/api/users/)
router.post('/', function(req, res) {
    User.findOne({
        username: req.body.username
    }, function(err, user) {
        if (err) throw err;
        if (user) {
            res.json({ success: false, message: 'Username is already taken!' });
        } else {
            new User({
                username: req.body.username,
                password: passwordHash.generate(req.body.password),
                mail: req.body.email,
                admin: false
            }).save(function(err) {
                if (err) throw err;
                res.json({ success: true });
            });
        }
    });

});

router.post('/auth', function(req, res) {
    User.findOne({
        username: req.body.username
    }, function(err, user) {
        if (err) throw err;
        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
            if (!passwordHash.verify(req.body.password, user.password)) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {
                var token = jwt.sign(user, config.secret, {
                    expiresIn: 1440 // expires in 24 hours
                });
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }
        }
    });
});

module.exports = router;