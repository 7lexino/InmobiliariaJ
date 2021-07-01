const { Router } = require('express');
const router = Router();

const Contrato = require('../models/Contrato');

router.post('/nuevo', async (req, res) => {
    const { noContrato, tipo, fechaInicio, fechaCierre, aval, costoInicial, costoPeriodo, propiedadId, inquilinoId  } = req.body;
    const newContrato = new Contrato({noContrato, tipo, fechaInicio, fechaCierre, aval, costoInicial, costoPeriodo, propiedadId, inquilinoId});
    await newContrato.save();
    res.status(200).send(true);
});

router.get('/activos', async (req, res) => {
    const contratos = await Contrato.aggregate([{
        $lookup: {
            from: 'propiedads',
            localField: 'propiedadId',
            foreignField: '_id',
            as: 'propiedad'
        }
    }]);
    res.status(200).json(contratos);
})

router.get('/get/:id', async (req, res) => {
    const contrato = await Contrato.findById(req.params.id);
    res.status(200).json(contrato);
})

router.delete('/delete/:id', async (req, res) => {
    
})

router.put('/actualizar', async (req, res) => {
    
})

module.exports = router;