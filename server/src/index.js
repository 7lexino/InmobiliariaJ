//Iniciamos el servidor
const express = require('express');
const app = express();
const cors = require('cors');


//Nos conectamos a la base de datos
require('./database');

app.use(cors());
app.use(express.json());
app.use('/api/user', require('./routes/user.routes'));
app.use('/api/inquilino', require('./routes/inquilino.routes'));
app.use('/api/propiedad', require('./routes/propiedad.routes'));
app.use('/api/contrato', require('./routes/contrato.routes'));

app.listen(3000);
console.log('Server on port', 3000);