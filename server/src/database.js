const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/inmobiliaria_DB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log("Database is connected"))
    .catch(err => console.log(err));