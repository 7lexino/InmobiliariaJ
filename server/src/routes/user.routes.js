const { Router } = require('express');
const router = Router();

const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    const { nombre, nick, correo, contra} = req.body;
    const newUser = new User({nombre, nick, correo, contra, rango: 1});
    await newUser.save();

    const token = jwt.sign({_id: newUser._id}, 'secretKey');

    res.status(200).json({token});
});

router.put('/update', async (req, res) => {
    const {user, password} = req.body;
    await User.findOneAndUpdate({'user': user}, {'password': password});
    res.send("Usuario actualizado");
});

router.post('/login', async (req, res) => {
    const {nick, contra} = req.body;

    const userLogin = await User.findOne({nick: nick});

    if(!userLogin) return res.status(401).send("wrong_user");
    if(userLogin.contra !== contra) return res.status(401).send("wrong_password");

    const token = jwt.sign({_id: userLogin._id}, 'secretKey');

    return res.status(200).json({token});
});

router.get('/getActiveUser', async (req, res) => {
    VerificarToken(req, res);
    res.status(200).json(req._id);
});

router.get('/usuario/:nick', async (req, res) => {
    const usuario = await User.findOne({nick: req.params.nick});
    res.status(200).json(usuario);
});

router.get('/getusuario/:id', async (req, res) => {
    const usuario = await User.findOne({_id: req.params.id});
    res.status(200).json(usuario);
});

module.exports = router;


function VerificarToken(req, res){
    ///Verificamos que exista un token en el header
    if(!req.headers.authorization) return res.status(401).send("Petición no autorizada");
    
    //Dividimos la cadena y obtenemos el token
    const token = req.headers.authorization.split(' ')[1];

    //Verificamos que el token no sea vacío
    if(token == 'null') return res.status(401).send("Petición no autorizada");

    //Obtenemos los datos guardados en el token
    const data = jwt.verify(token, 'secretKey');

    //Guardamos el id
    req._id = data._id;
}