/**
 * Created by lelabo on 25/04/17.
 */
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Advantage = require('../models/advantage');

router.get('/', function(req, res) {
    Advantage.find().exec(function(err, advantages) {
        if (err) throw err;
        res.json(advantages);
    });
});

module.exports = router;