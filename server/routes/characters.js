/**
 * Created by lelabo on 25/04/17.
 */
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Character = require('../models/character');

router.post('/', function (req, res) {
    new Character({
        _owner: mongoose.Schema.Types.ObjectId(req.user._id),
        name: req.body.name,
        exp: req.body.exp,
    }).save(function(err) {
        if (err) throw err;
        res.json({ success: true });
    });
});

router.get('/', function(req, res) {
    Character.find({_owner: mongoose.Schema.Types.ObjectId(req.user._id)}).populate('_owner').exec(function(err, characters) {
        if (err) throw err;
        res.json(characters);
    });
});

router.get('/:id', function(req, res) {
    Character.find({_id: mongoose.Schema.Types.ObjectId(req.params.id)}, function(err, users) {
        if (err) throw err;
        res.json(users);
    });
});


module.exports = router;