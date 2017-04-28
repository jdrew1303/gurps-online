/**
 * Created by lelabo on 07/04/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', new Schema({
    username: String,
    mail: String,
    password: String,
    admin: Boolean,
    characters: [{ type: Schema.Types.ObjectId, ref: 'Character' , default: []}],
    campaigns: [{ type: Schema.Types.ObjectId, ref: 'Campaign' , default: []}],
}));