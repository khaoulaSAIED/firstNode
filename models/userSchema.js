var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema (
{
    name : {type: String},// j ai ecrit firstName, non accepté
    age : {type: Number},
    todo : [{type: Schema.Types.ObjectId, ref: 'Todo'}],//référence mongoose, []un tableau de todo
    //email: {type: mongoose.SchemaTypes.Email, required: true}
    email: {type: String, required: true},//controle de saisie fel front yssir
    photo: {type: String},
    password: {type: String, required: true}

});
module.exports = mongoose.model('User',userSchema);//nom du schema= User