const { Router } = require('express');
const router = Router();

const Transaccion = require('../models/Transaccion');
const Contrato = require('../models/Contrato');

router.post('/nueva', async (req, res) => {
    const { fecha, tipo, concepto, monto, saldo, adjuntoId, noContrato } = req.body;
    const newTransaccion = new Transaccion({ fecha, tipo, concepto, monto, saldo, adjuntoId, noContrato });
    //Creamos la transaccion
    await newTransaccion.save();

    await Contrato.findOneAndUpdate({ noContrato: noContrato }, { $set: { saldo: saldo } } );

    res.status(200).send(true);
});

router.get('/ultima_por_contrato/:noContrato', async (req, res) => {
    const transaccion = await Transaccion.findOne({ noContrato: req.params.noContrato}, {}, { sort: { 'fecha':-1, 'createdAt': -1 } });
    res.status(200).json(transaccion);
});

router.get('/todas_by_contrato/:noContrato', async (req, res) => {
    const transacciones = await Transaccion.find({ noContrato: req.params.noContrato }, "fecha concepto tipo monto saldo documento createdAt", function(err, docs){
        if(err) console.log(err);
    }).sort({createdAt: 1, fecha: 1});
    res.status(200).json(transacciones);
});

router.get('/transacciones_empresa', async (req, res) => {
    const transacciones = await Transaccion.find({ adjuntoId: "transferencia", noContrato: 0, $or: [{tipo: "abono"}, {tipo: "egreso"}] }, {}, { sort: { 'fecha': 1, 'createdAt': 1 } });
    res.status(200).json(transacciones);
});

module.exports = router;