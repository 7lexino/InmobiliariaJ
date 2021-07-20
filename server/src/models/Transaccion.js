const { Schema, model } = require('mongoose');

const transaccionSchema = new Schema({
    fecha: String,
    concepto: String,
    tipo: String, //Cargo o Abono
    monto: Number,
    saldo: Number,
    adjuntoId: Number,
    noContrato: Number
}, {
    timestamps: true
});

module.exports = model('Transaccion', transaccionSchema);