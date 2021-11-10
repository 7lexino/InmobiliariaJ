const { Router } = require('express');
const router = Router();

const Pago = require('../models/Pago');
const Transaccion = require('../models/Transaccion');
const Contrato = require("../models/Contrato");

router.post('/nuevo', async (req, res) => {
    var transaccion = new Object();
    const { fecha, metodoPago, monto, noContrato, datos } = req.body;
    const dFecha = new Date(fecha); //Parseamos el string a Date
    var ultima_transaccion;

    //Generamos y guardamos el pago
    const newPago = new Pago({ fecha: dFecha.toISOString(), metodoPago: metodoPago, monto: monto });
    await newPago.save();

    //Generamos la transacción
    transaccion.noContrato = noContrato;
    transaccion.fecha = dFecha.toISOString();
    transaccion.monto = monto;
    if(metodoPago == "Transferencia")
        transaccion.adjuntoId = "transferencia";
    else if(metodoPago == "Cheque")
        transaccion.adjuntoId = "cheque";
    else if(metodoPago == "Depósito")
        transaccion.adjuntoId = "deposito";
    else
        transaccion.adjuntoId = "";

    if(noContrato != 0){
        //Traemos el inquilino con el contrato
        const contratox = await Contrato.find({ noContrato: noContrato });
        if(contratox[0].inquilino.tipo == true)
            transaccion.concepto = metodoPago + " realizada por " + contratox[0].inquilino.contacto.nombre + " " + contratox[0].inquilino.contacto.apellidos;
        else
            transaccion.concepto = metodoPago + " realizada por " + contratox[0].inquilino.empresa;
        transaccion.tipo = 'abono';

        //Obtenemos la ultima transacción generada del contrato para obtener el saldo
        ultima_transaccion = await Transaccion.find({ noContrato: noContrato}, null, { limit: 1 }).sort({createdAt:-1, fecha:-1})
        if(ultima_transaccion.length > 0)
            transaccion.saldo = ultima_transaccion[0].saldo - monto;
        else
            transaccion.saldo = transaccion.monto

        //Guardamos la transacción para el Estado de cuenta del Cliente
        var tempTransaccion = new Transaccion(transaccion);
        await tempTransaccion.save();

        //Ahora generamos preparamos la transacción para el Edo. de cuenta General
        transaccion.noContrato = 0;
        //Obtenemos la ultima transacción generada del contrato para obtener el saldo
        ultima_transaccion = await Transaccion.find({ noContrato: 0}, null, { limit: 1 }).sort({createdAt:-1, fecha:-1})
        if(ultima_transaccion.length > 0)
            transaccion.saldo = ultima_transaccion[0].saldo + monto;
        else
            transaccion.saldo = transaccion.monto

        //Guardamos
        tempTransaccion = new Transaccion(transaccion);
        await tempTransaccion.save();

        //Ahora consultamos cuál es la cantidad de saldo pendiente del contrato para actualizarla
        await Contrato.findOneAndUpdate({ noContrato: noContrato }, { $inc: { saldo: (monto * -1) } } );

    }else{
        transaccion.concepto = datos;
        transaccion.tipo = 'egreso';

        //Obtenemos la ultima transacción generada del contrato para obtener el saldo
        ultima_transaccion = await Transaccion.find({ noContrato: 0}, null, { limit: 1 }).sort({createdAt:-1, fecha:-1})
        if(ultima_transaccion.length > 0)
            transaccion.saldo = ultima_transaccion[0].saldo - monto;
        else
            transaccion.saldo = transaccion.monto

        //Guardamos la transacción para el Estado de cuenta del Cliente
        var tempTransaccion = new Transaccion(transaccion);
        await tempTransaccion.save();
    }

    res.status(200).send(true);
});

module.exports = router;