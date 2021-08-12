const { Router } = require('express');
const router = Router();

const Inquilino = require('../models/Inquilino');
const Propiedad = require('../models/Propiedad');

router.post('/nueva', async (req, res) => {
    const { predial, tipo, estadoRenta, direccion } = req.body;
    const newPropiedad = new Propiedad({predial, tipo, estadoRenta, direccion});
    await newPropiedad.save();
    res.status(200).send(true);
});

router.get('/todas', async (req, res) => {
    const props = await Propiedad.find({});
    res.status(200).json(props);
})

router.get('/disponibles', async (req, res) => {
    const props = await Propiedad.find({"estadoRenta": "Disponible"});
    res.status(200).json(props);
})

router.get('/rentadas', async (req, res) => {
    const props = await Propiedad.find({"estadoRenta": "Rentada"});
    res.status(200).json(props);
})

router.get('/get/:id', async (req, res) => {
    const prop = await Propiedad.findById(req.params.id);
    res.status(200).json(prop);
})

router.delete('/delete/:id', async (req, res) => {
    const prop = await Propiedad.findByIdAndDelete(req.params.id);
    res.status(200).json(prop);
})

router.put('/actualizar', async (req, res) => {
    const propiedad = req.body;
    await Propiedad.updateOne({_id: propiedad._id}, { $set: { 
        tipo: propiedad.tipo,
        direccion: {
            calle: propiedad.direccion.calle,
            no_ext: propiedad.direccion.no_ext,
            no_int: propiedad.direccion.no_int,
            colonia: propiedad.direccion.colonia,
            c_p: propiedad.direccion.c_p,
            ciudad: propiedad.direccion.ciudad,
            estado: propiedad.direccion.estado
        } } });
    res.status(200).send(true);
})

module.exports = router;