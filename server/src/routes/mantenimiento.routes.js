const { Router } = require('express');
const router = Router();

const Mantenimiento = require('../models/Mantenimiento');

router.post('/nuevo', async (req, res) => {
    const { fecha, descripcion, costo, propiedadId } = req.body;
    const newMtto = new Mantenimiento({ fecha, descripcion, costo, propiedadId });
    await newMtto.save();
    res.status(200).send(true);
});

router.get('/mantenimientos/:id', async (req, res) => {
    const propId = req.params.id;
    // Mantenimiento.aggregate([{
    //     $lookup: {
    //         from: 'propiedades',
    //         localField: 'propiedadId',
    //         foreignField: '_id',
    //         as: 'propiedad'
    //     }
    // }]);
    const mantenimientos = await Mantenimiento.find({propiedadId: propId}).sort({ 'fecha': -1});
    res.status(200).json(mantenimientos);
});

router.get('/get/:id', async (req, res) => {
    const mtto = await Mantenimiento.findById(req.params.id);
    res.status(200).json(mtto);
})

router.put('/update', async (req, res) => {
    const mtto = req.body;
    await Mantenimiento.updateOne({_id: mtto._id}, {$set: {
        fecha: mtto.fecha,
        descripcion: mtto.descripcion,
        costo: mtto.costo,
        propiedadId: mtto.propiedadId
    }})
    res.status(200).send(true);
});

router.delete('/delete/:id', async (req, res) => {
    await Mantenimiento.findByIdAndDelete(req.params.id);
    res.status(200).send(true);
});

module.exports = router;