var express = require('express');
var router = express.Router();
var User   = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res) {
    res.json({ message: 'Welcome to the coolest API on earth!' });
});

// route to return all users (GET http://localhost:8080/api/users)
router.get('/users', function(req, res) {
    User.find({}, function(err, users) {
        res.json(users);
    });
});

router.get('/setup', function(req, res) {

    // create a sample user
    var nick = new User({
        name: 'test42',
        password: '4221',
        admin: true
    });

    // save the sample user
    nick.save(function(err) {
        if (err) throw err;

        console.log('User saved successfully');
        res.json({ success: true });
    });
});

module.exports = router;
