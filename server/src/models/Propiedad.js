const { Schema, model } = require('mongoose');
const Inquilino = model('Inquilino')

const propiedadSchema = new Schema({
    predial: String,
    tipo: String,
    estadoRenta: String,
    direccion: {
        calle: String,
        no_ext: String,
        no_int: String,
        colonia: String,
        c_p: Number,
        ciudad: String,
        estado: String
    }
}, {
    timestamps: true
});

module.exports = model('Propiedad', propiedadSchema);