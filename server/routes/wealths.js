/**
 * Created by lelabo on 25/04/17.
 */
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Wealth = require('../models/wealth');

router.get('/', function(req, res) {
    Wealth.find().exec(function(err, wealths) {
        if (err) throw err;
        res.json(wealths);
    });
});

module.exports = router;