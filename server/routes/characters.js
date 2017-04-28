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
    Character.findOne({id: mongoose.Schema.Types.ObjectId(req.params.id)}).exec(function(err, users) {
        if (err) throw err;
        res.json(users);
    });
});

router.delete('/:id', function(req, res) {
    console.log(req.params.id);
    Character.findOne({id : mongoose.Schema.Types.ObjectId(req.params.id)}).exec(function (err, obj){
        console.log(obj);
        if (err) throw err;
        obj.remove(function (err) {
            if (err) throw err;
            res.json({ success: true });
        });
    });
});

module.exports = router;