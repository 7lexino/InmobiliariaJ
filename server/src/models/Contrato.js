const { Schema, model } = require('mongoose');

const contratoSchema = new Schema({
    noContrato: Number,
    tipo: Boolean,
    fechaInicio: String,
    fechaCierre: String,
    aval: {
        nombre: String,
        correo: String,
        telefono1: String,
        telefono2: String,
    },
    costoInicial: Number,
    costoPeriodo: Number,
    propiedadId: { type: Schema.ObjectId, ref: 'Propiedad' },
    inquilinoId: { type: Schema.ObjectId, ref: 'Inquilino' }
},{
    timestamps: true
});

module.exports = model('Contrato', contratoSchema);