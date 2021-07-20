const { Schema, model } = require('mongoose');

const pagoSchema = new Schema({
    fecha: String,
    metodoPago: String,
    monto: Number
}, {
    timestamps: true
});

module.exports = model('Pago', pagoSchema);