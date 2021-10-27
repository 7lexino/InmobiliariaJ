const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/inmobiliaria_DEV', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log("Base de datos conectada!"))
    .catch(err => console.log(err));