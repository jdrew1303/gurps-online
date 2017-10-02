/**
 * Created by lelabo on 25/04/17.
 */
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Damage = require('../models/damage');

router.get('/', function(req, res) {
    Damage.find().exec(function(err, damages) {
        if (err) throw err;
        res.json(damages);
    });
});

module.exports = router;