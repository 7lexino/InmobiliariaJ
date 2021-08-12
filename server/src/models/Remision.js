const { Schema, model } = require('mongoose');

const remisionSchema = new Schema({
    id: Number,
    factura: String,
    concepto: String,
    total: Number,
    noContrato: Number
}, {
    timestamps: true
});

module.exports = model('Remision', remisionSchema);