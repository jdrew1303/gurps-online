/**
 * Created by lelabo on 25/04/17.
 */
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var HabitType = require('../models/habit_type');
var Characters = require('../models/character');

router.get('/types/', function(req, res) {
    HabitType.find().exec(function(err, types) {
        if (err) throw err;
        res.json(types);
    });
});

router.post('/', function (req, res) {
    new Habits({
        _owner: ObjectId(req.body.character),
        name: req.body.name,
        description: req.body.description,
        _type: req.body.type,
    }).save(function(err, habit) {
        if (err) throw err;
        Characters.findOne({_id: ObjectId(req.body.character)}, function (err, obj) {
            obj.habits.push(ObjectId(habit._id));
            obj.save()
            res.json({ success: true });
        });
    });
});

module.exports = router;