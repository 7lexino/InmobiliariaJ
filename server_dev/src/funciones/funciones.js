
const Pago = require('../models/Pago');
const Transaccion = require('../models/Transaccion');
const Remision = require('../models/Remision');
const Mantenimiento = require('../models/Mantenimiento');
const Inquilino = require('../models/Inquilino');
const Propiedad = require('../models/Propiedad');
const Contrato = require('../models/Contrato');

async function HacerPropiedadesDisponibles(){
    await Propiedad.update({}, { estadoRenta: "Disponible" });
}

async function ReiniciarSistemaTransacciones(){
    await Pago.remove({});
    await Transaccion.remove({});
    await Remision.remove({});
    await Mantenimiento.remove({});
    
    await Contrato.update({}, { saldo: 0 });
    
    console.log("Función ejecutada");
}

async function EliminarContratos(){
    await Contrato.remove({});
    await HacerPropiedadesDisponibles();
}

async function VerContratos(){
    var contratos = await Contrato.find();
    console.log(contratos);
}


ReiniciarSistemaTransacciones();
//VerContratos();