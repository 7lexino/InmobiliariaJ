const { Router } = require('express');
const router = Router();

const Remision = require('../models/Remision');

router.get('/remisiones/:noContrato', async (req, res) => {
    const remisiones = await Remision.find({ noContrato: req.params.noContrato });
    res.status(200).json(remisiones);
});

router.post('/nueva', async (req, res) => {
    const { id, factura, concepto, total, noContrato } = req.body;
    const newRemision = new Remision({ id, factura, concepto, total, noContrato });
    //Creamos la remisión
    await newRemision.save();
    res.status(200).send(true);
});

module.exports = router;