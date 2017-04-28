/**
 * Created by lelabo on 28/04/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Campaign', new Schema({
    _owner  : { type: Schema.Types.ObjectId, ref: 'User' },
    name    : String,
    players : [{ type: Schema.Types.ObjectId, ref: 'Character', default: [] }],
}));