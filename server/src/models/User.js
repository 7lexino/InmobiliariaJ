const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    nombre: String,
    nick: String,
    correo: String,
    contra: String
}, {
    timestamps: true
});

module.exports = model('User', userSchema);