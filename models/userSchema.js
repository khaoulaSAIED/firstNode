var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema (
{
    name : {type: String},// j ai ecrit firstName, non accepté
    age : {type: Number},
});
module.exports = mongoose.model('User',userSchema);//nom du schema= User