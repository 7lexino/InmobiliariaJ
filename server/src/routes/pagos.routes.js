const { Router } = require('express');
const router = Router();

const Pago = require('../models/Pago');

router.post('/nuevo', async (req, res) => {
    const { fecha, metodoPago, monto } = req.body;
    const newPago = new Pago({ fecha, metodoPago, monto });
    //Creamos la transaccion
    await newPago.save();
    res.status(200).send(true);
});

module.exports = router;