const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');
//validar roles

let Schema = mongoose.Schema;
let categoriaSchema = new Schema({
    nombre:{ type:String, required:true},
    descripcion:{type:String},
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' }
});

//categoriaSchema.plugin(uniqueValidator,{message: '{PATH} Debe ser unico'});
module.exports = mongoose.model('categoria',categoriaSchema);