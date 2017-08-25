/**
 * Created by lelabo on 25/04/17.
 */
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Posture = require('../models/posture');

router.get('/', function(req, res) {
    Posture.find().exec(function(err, postures) {
        if (err) throw err;
        res.json(postures);
    });
});

module.exports = router;