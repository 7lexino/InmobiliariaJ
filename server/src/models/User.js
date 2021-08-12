const { Schema, model } = require('mongoose');

//Rangos existentes
//1 - operador = Operación del sistema pero sin poder crear, eliminar ni modificar catálogos
//2 - editor = Puede crear, eliminar y modificar catálogos
//3 - admin = Todo lo anterior + crear nuevos usuarios

const userSchema = new Schema({
    nombre: String,
    nick: String,
    correo: String,
    contra: String,
    rango: Number
}, {
    timestamps: true
});

module.exports = model('User', userSchema);