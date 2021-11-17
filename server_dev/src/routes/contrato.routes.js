const { Router } = require('express');
const router = Router();

const Contrato = require('../models/Contrato');
const Propiedad = require('../models/Propiedad');
const Inquilino = require('../models/Inquilino');
const Transaccion = require('../models/Transaccion');

router.post('/nuevo', async (req, res) => {
    var { tipo, fechaInicio, fechaCierre, aval, costoInicial, costoPeriodo, propiedad, inquilino  } = req.body;
    var noContrato = 0;

    //Realizamos consultas a la DB para poner la información de la propiedad e inquilino del contrato.
    //Estas consultas las haremos de manera sincrona
    try{
        //Consultamos y seteamos la información de la propiedad
        const prop = await Propiedad.findById(propiedad._id);
        propiedad = prop;
    
        //Después consultamos y seteamos la información del inquilino
        const inq = await Inquilino.findById(inquilino._id);
        inquilino = inq;
    
        //Ahora consultamos para obtener el último id
        const ultimoContrato = await Contrato.findOne({}, {}, { sort: { 'noContrato': -1 } });
        if(ultimoContrato){
            noContrato = ultimoContrato.noContrato + 1;
        }else{
            noContrato = 1;
        }

        //Cuando ya tenemos todos los datos recopilados y guardados, ahora si creamos el contrato
        const newContrato = new Contrato({noContrato, tipo, fechaInicio, fechaCierre, aval, costoInicial, costoPeriodo, propiedad, inquilino, saldo:0 });
        await newContrato.save(); //Guardamos los datos en la DB

        //Ahora cambiamos el estatus de la propiedad a "Rentada"
        await Propiedad.findByIdAndUpdate(propiedad._id, {$set: {estadoRenta: "Rentada"}});
        
        //Despues de guardada la información en la DB, ahora si enviamos respuesta exitosa al frontend
        res.status(200).send(true);
    }catch(err){
        //Recopilamos y mostramos cualquier error que pueda suceder
        console.log(err);
    }
});

router.get('/todos', async (req, res) => {
    //Hacemos la consulta
    var contratos = await Contrato.find({ noContrato: { $gt: 0 } });
    //Enviamos la respuesta obtenida al frontend
    res.status(200).json(contratos);
})

router.get('/activos', async (req, res) => {
    const today = new Date().toJSON().slice(0,10); //Obtenemos la fecha actual

    //Filtramos los contratos en los que su fecha de cierre sea mayor o igual que hoy
    const contratos = await Contrato.find({ fechaCierre: {$gte: today} });

    //Enviamos la respuesta obtenida al frontend
    res.status(200).json(contratos);
})

router.get('/vencer', async (req, res) => {
    var today = new Date(); //Obtenemos la fecha actual
    var next = new Date();
    next.setDate(today.getDate() + 20); //Sumamos 20 días a la fecha actual
    today = today.toJSON().slice(0,10); //Convertimos la fecha a string
    next = next.toJSON().slice(0,10);
    const contratos = await Contrato.find({ fechaCierre: {$gte: today, $lte: next} });
    res.status(200).json(contratos);
})

router.get('/archivados', async (req, res) => {
    const today = new Date().toJSON().slice(0,10); //Obtenemos la fecha actual y la convertimos a string
    const contratos = await Contrato.find({ fechaCierre: {$lt: today} });
    res.status(200).json(contratos);
});

router.get('/get/:id', async (req, res) => {
    const contrato = await Contrato.findById(req.params.id);
    res.status(200).json(contrato);
});

router.get('/get_by_contrato/:noContrato', async (req, res) => {
    const contratos = await Contrato.find({ noContrato: req.params.noContrato });
    const contrato = contratos[0];
    res.status(200).json(contrato);
});

module.exports = router;