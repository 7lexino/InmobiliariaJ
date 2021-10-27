const { Router } = require('express');
const router = Router();

const Remision = require('../models/Remision');
const Transaccion = require('../models/Transaccion');
const Contrato = require('../models/Contrato');

router.get('/remisiones/:noContrato', async (req, res) => {
    const remisiones = await Remision.find({ noContrato: req.params.noContrato });
    res.status(200).json(remisiones);
});

router.post('/nueva', async (req, res) => {
    let fecha = new Date(Date.now());
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
    var ultimaTransaccion = await Transaccion.find({ noContrato: noContrato}, null, { limit: 1 }).sort({createdAt:-1, fecha:-1})
    if(ultimaTransaccion.length > 0){
        console.log(ultimaTransaccion);
        console.log(total);
        
        saldoNuevo = ultimaTransaccion[0].saldo + total;
    }

    if(factura == ''){
        const newTransaccion = new Transaccion({ fecha: fecha.toISOString(), tipo:'cargo', concepto: newRemision.id + '. ' + concepto, monto: total, saldo: saldoNuevo, adjuntoId: newRemision.id, noContrato });
        await newTransaccion.save();
    }else{
        const newTransaccion2 = new Transaccion({ fecha: fecha.toISOString(), tipo:'cargo', concepto: newRemision.id + '. ' + concepto, monto: total, saldo: saldoNuevo, adjuntoId: factura, noContrato });
        await newTransaccion2.save();
    }

    await Contrato.findOneAndUpdate({ noContrato: noContrato }, { $set: { saldo: saldoNuevo } });

    res.status(200).send(true);
});

module.exports = router;