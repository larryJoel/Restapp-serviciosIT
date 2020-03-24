const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
};

let Schema = mongoose.Schema;
let usuarioSchema = new Schema({
    nombre:{
        type: String,
        required: [true,'El nombre es necesario']
    },
    email:{
        type:String,
        unique:true,
        required:[true,'El email es necesario']
    },
    password:{
        type: String,
        required:[true, 'La contraseña es obligatoria']
    },
    img:{
        type:String,
    },
    role:{
        type: String,
        default:'USER_ROLE',
        enum:rolesValidos
    },
    estado:{
        type: Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    }
});
// una forma de quitar la información del password 
// cuando se muestran los datos del usuario creado.
usuarioSchema.methods.toJSON = function(){
    let user = this;
    let userObjet = user.toObject();
    delete userObjet.password;
    return userObjet;
}


usuarioSchema.plugin(uniqueValidator,{ message: '{PATH} Debe de ser unico' });
module.exports = mongoose.model('usuario', usuarioSchema);