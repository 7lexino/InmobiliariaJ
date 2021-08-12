const { Router } = require('express');
const router = Router();

const Transaccion = require('../models/Transaccion');

router.post('/nueva', async (req, res) => {
    const { tipo, concepto, monto, saldo, adjuntoId, noContrato } = req.body;
    const newTransaccion = new Transaccion({ tipo, concepto, monto, saldo, adjuntoId, noContrato });
    //Creamos la transaccion
    await newTransaccion.save();
    res.status(200).send(true);
});

router.get('/ultima_por_contrato/:noContrato', async (req, res) => {
    const transaccion = await Transaccion.findOne({noContrato: req.params.noContrato}, {}, { sort: { 'createdAt': -1 } });
    res.status(200).json(transaccion);
});


router.get('/todas_by_contrato/:noContrato', async (req, res) => {
    const transacciones = await Transaccion.find({ noContrato: req.params.noContrato }, {}, { sort: { 'createdAt': 1 } });
    res.status(200).json(transacciones);
});

module.exports = router;