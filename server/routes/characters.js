/**
 * Created by lelabo on 25/04/17.
 */
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Character = require('../models/character');
var User = require('../models/user');
var Campaign = require('../models/campaign');
var ObjectId = mongoose.Types.ObjectId;


router.post('/', function (req, res) {
    new Character({
        _owner: ObjectId(req.user._id),
        name: req.body.name,
        exp: req.body.exp,
        freexp: req.body.exp,
    }).save(function(err, character) {
        if (err) throw err;
        req.user.characters.push(ObjectId(character._id));
        req.user.save();
        res.json({ success: true });
    });
});

router.get('/', function(req, res) {
    Character.find({_owner: ObjectId(req.user._id)}).populate('_owner').exec(function(err, characters) {
        if (err) throw err;
        res.json(characters);
    });
});

router.get('/:id', function(req, res) {
    Character.findOne({_id: ObjectId(req.params.id)}).populate('_owner campaign').exec(function(err, characters) {
        if (err) throw err;
        res.json(characters);
    });
});

router.put('/:id', function(req, res) {
    Character.findOneAndUpdate({_id: ObjectId(req.params.id)}, req.body).exec(function(err, characters) {
        if (err) throw err;
        res.json({ success: true });
    });
});

router.delete('/:id', function(req, res) {
    Character.findOne({_id : ObjectId(req.params.id)}).exec(function (err, obj){
        if (err) throw err;
        User.findOneAndUpdate({_id: ObjectId(obj._owner)}, {$pull: {characters: ObjectId(obj._id)}}, function(err){
            if (err) throw err;
            obj.remove(function (err) {
                if (err) throw err;
                res.json({ success: true });
            });
        });
    });
});

router.get('/join/:id/:campaign', function (req, res) {
    Character.findOne({_id : ObjectId(req.params.id)}).exec(function (err, character) {
        if (err) throw err;
        Campaign.findOne({_id : ObjectId(req.params.campaign)}).exec(function (err, campaign) {
            if (err) throw err;
            campaign.players.push(ObjectId(character._id));
            character.campaign = ObjectId(campaign._id);
            character.status = 'campaign';
            campaign.save();
            character.save();
            res.json({ success: true });
        });
    });
});

router.get('/leave/:id', function (req, res) {
    Character.findOne({_id : ObjectId(req.params.id)}).exec(function (err, character) {
        if (err) throw err;
        Campaign.findOneAndUpdate({_id: ObjectId(character.campaign)}, {$pull: {players: ObjectId(character._id)}}, function(err){
            if (err) throw err;
            character.campaign = null;
            character.status = 'alive';
            character.save();
            res.json({ success: true });
        });
    });
});

module.exports = router;