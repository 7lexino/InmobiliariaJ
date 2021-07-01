const { Router } = require('express');
const router = Router();

const Inquilino = require('../models/Inquilino');

router.post('/nuevo', async (req, res) => {
    const { tipo, empresa, contacto } = req.body;
    const newInquilino = new Inquilino({tipo, empresa, contacto});
    await newInquilino.save();
    res.status(200).send(true);
});

router.get('/todos', async (req, res) => {
    const inquilinos = await Inquilino.find({});
    res.status(200).json(inquilinos);
})

router.get('/get/:id', async (req, res) => {
    const inqui = await Inquilino.findById(req.params.id);
    res.status(200).json(inqui);
})

router.delete('/delete/:id', async (req, res) => {
    const prop = await Inquilino.findByIdAndDelete(req.params.id);
    res.status(200).json(prop);
})

router.put('/actualizar', async (req, res) => {
    const inquilino = req.body;
    await Inquilino.updateOne({_id: inquilino._id}, { $set: { 
        contacto: {
            nombre: inquilino.contacto.nombre,
            apellidos: inquilino.contacto.apellidos,
            correo: inquilino.contacto.correo,
            telefono1: inquilino.contacto.telefono1,
            telefono2: inquilino.contacto.telefono2,
        } } });
    res.status(200).send(true);
})

module.exports = router;