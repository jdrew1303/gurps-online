/**
 * Created by lelabo on 25/04/17.
 */
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Appearance = require('../models/appearance');

router.get('/', function(req, res) {
    Appearance.find().exec(function(err, appearances) {
        if (err) throw err;
        res.json(appearances);
    });
});

module.exports = router;