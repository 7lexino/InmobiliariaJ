const { Router } = require('express');
const router = Router();

const Remision = require('../models/Remision');
const Transaccion = require('../models/Transaccion');

router.get('/remisiones/:noContrato', async (req, res) => {
    const remisiones = await Remision.find({ noContrato: req.params.noContrato });
    res.status(200).json(remisiones);
});

router.post('/nueva', async (req, res) => {
    let fecha = new Date(Date.now());
    console.log(fecha);
    const { factura, concepto, total, noContrato } = req.body;
    let ultimoNoRemision = 1;
    let saldoNuevo = total;

    //Hacemos una consulta para obtener la última remisión generada
    const ultimaRemision = await Remision.findOne({}, {}, { sort: { 'createdAt': -1 } });
    if(ultimaRemision){
        ultimoNoRemision = ultimaRemision.id + 1;
    }

    const newRemision = new Remision({ id: ultimoNoRemision, factura, concepto, total, noContrato });
    //Creamos la remisión
    await newRemision.save();

    //Ahora generamos una transacción
    //Primero obtenemos la última transaccion generada
    const ultimaTransaccion = await Transaccion.findOne({noContrato: noContrato}, {}, { sort: { 'createdAt': -1 } });
    if(ultimaTransaccion){
        saldoNuevo = ultimaTransaccion.saldo + total;
    }
    console.log(fecha.getFullYear() + '-' + fecha.getMonth() + '-' + fecha.getDay());
    if(factura == ''){
        const newTransaccion = new Transaccion({ fecha: fecha.toISOString(), tipo:'cargo', concepto: newRemision.id + '. ' + concepto, monto: total, saldo: saldoNuevo, adjuntoId: newRemision.id, noContrato });
        await newTransaccion.save();
    }else{
        const newTransaccion2 = new Transaccion({ fecha: fecha.toISOString(), tipo:'cargo', concepto: newRemision.id + '. ' + concepto, monto: total, saldo: saldoNuevo, adjuntoId: factura, noContrato });
        await newTransaccion2.save();
    }

    res.status(200).send(true);
});

module.exports = router;