/**
 * Created by lelabo on 12/04/17.
 */
var express = require('express');
var router  = express.Router();
var jwt     = require('jsonwebtoken');
var config  = require('../config');
var User   = require('../models/user');

router.use(function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token && token !== 'undefinded') {
    jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                req.token = decoded;
                User.findOne({_id: decoded._doc._id}).populate('characters').exec(function(err, user) {
                    req.user = user;
                    next();
                });
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

module.exports = router;