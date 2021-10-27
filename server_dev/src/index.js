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
app.use('/api/mantenimiento', require('./routes/mantenimiento.routes'));
app.use('/api/remision', require('./routes/remision.routes'));
app.use('/api/transaccion', require('./routes/transaccion.routes'));
app.use('/api/pago', require('./routes/pagos.routes'));
app.use('/api/excel', require('./routes/excel.routes'));

app.listen(3666);
console.log('Server on port', 3666);