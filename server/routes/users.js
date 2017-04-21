var express = require('express');
var router = express.Router();
var User   = require('../models/user');

// User listing
// (GET http://localhost:8080/api/users/)
router.get('/', function(req, res) {
    User.find({}, function(err, users) {
        res.json(users);
    });
});

router.get('/me', function(req, res) {
    delete req.user.password;
    res.json(req.user);
});


router.get('/:id', function(req, res) {
    User.find({_id: req.params.id}, function(err, users) {
        res.json(users);
    });
});


module.exports = router;
