const { Schema, model } = require('mongoose');

const contratoSchema = new Schema({
    noContrato: Number,
    tipo: Boolean, //True=facturado, False=No facturado
    fechaInicio: String,
    fechaCierre: String,
    saldo: Number,
    aval: {
        nombre: String,
        correo: String,
        telefono1: String,
        telefono2: String,
    },
    costoInicial: Number,
    costoPeriodo: Number,
    propiedad: {
        _id: String,
        predial: String,
        direccion: {
            calle: String,
            no_ext: String,
            no_int: String,
            colonia: String,
            c_p: Number,
            ciudad: String,
            estado: String
        }
    },
    inquilino: {
        _id: String,
        empresa: String,
        contacto: {
            nombre: String,
            apellidos: String,
            correo: String,
            telefono1: String,
            telefono2: String,
        }
    }
},{
    timestamps: true
});

module.exports = model('Contrato', contratoSchema);