var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema (
{
    name : {type: String},// j ai ecrit firstName, non accepté

});
module.exports = mongoose.model('Todo',todoSchema);//nom du schema= User