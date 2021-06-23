const { Schema, model } = require('mongoose');

const propiedadSchema = new Schema({
    predial: String,
    tipo: String,
    estadoRenta: String,
    direccion: {
        calle: String,
        no_ext: Number,
        no_int: Number,
        colonia: String,
        c_p: Number,
        ciudad: String,
        estado: String
    }
}, {
    timestamps: true
});

module.exports = model('Propiedad', propiedadSchema);