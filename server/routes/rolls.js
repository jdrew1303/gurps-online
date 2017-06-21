/**
 * Created by lelabo on 20/06/17.
 */
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var ObjectId = mongoose.Types.ObjectId;
var Roll = require('roll'), roll = new Roll();

router.post('/', function (req, res) {
    var dices = req.body.expression;
    var score = roll.roll(dices).result;
    res.json({ score: score });
});

module.exports = router;