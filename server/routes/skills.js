/**
 * Created by lelabo on 25/04/17.
 */
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Skill = require('../models/skill');
var ObjectId = mongoose.Types.ObjectId;


router.get('/', function(req, res) {
    Skill.find().exec(function(err, skills) {
        if (err) throw err;
        res.json(skills);
    });
});

router.get('/:id', function(req, res) {
    Skill.findOne({_id: ObjectId(req.params.id)}).exec(function(err, skill) {
        if (err) throw err;
        res.json(skill);
    });
});

router.get('/name/:name', function(req, res) {
    Skill.findOne({name: req.params.name}).exec(function(err, skill) {
        if (err) throw err;
        res.json(skill);
    });
});


module.exports = router;