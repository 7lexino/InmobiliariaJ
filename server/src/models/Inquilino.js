const { Schema, model } = require('mongoose');

const inquilinoSchema = new Schema({
    tipo: Boolean, //Individuo = true, Empresa = false
    empresa: String, //Nombre de la Compañía
    contacto: { //Información personal del contacto
        nombre: String,
        apellidos: String,
        correo: String,
        telefono1: String,
        telefono2: String,
    }
},{
    timestamps: true
});

module.exports = model('Inquilino', inquilinoSchema);