const { Schema, model } = require('mongoose');

const mantenimientoSchema = new Schema({
    fecha: String,
    descripcion: String,
    costo: Number,
    propiedadId: String
}, {
    timestamps: true
});

module.exports = model('Mantenimiento', mantenimientoSchema);