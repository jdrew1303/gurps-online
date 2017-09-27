/**
 * Created by lelabo on 25/04/17.
 */
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Disadvantage = require('../models/disadvantage');

router.get('/', function(req, res) {
    Disadvantage.find().exec(function(err, disadvantages) {
        if (err) throw err;
        res.json(disadvantages);
    });
});

module.exports = router;