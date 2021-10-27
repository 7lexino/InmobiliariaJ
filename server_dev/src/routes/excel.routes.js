const { Router } = require('express');
const router = Router();
const Excel = require("exceljs");
const Transaccion = require("../models/Transaccion");
var fs = require("fs");
var path = require("path");

router.get('/exportar_edo_cuenta_empresarial/:f_inicial/:f_final', async (req, res) => {
    try {
        var absPath = path.join(__dirname, '/archivos/', 'estado_cuenta.xlsx');
        var destino = path.join(__dirname, '../../../frontend/src/assets/files/', 'estado_cuenta.xlsx');


        var saldoInicial = 0;
        var totalIngresos = 0;
        var totalEgresos = 0;
        var fecha_inicial = new Date(req.params.f_inicial);
        var fecha_final = new Date(req.params.f_final);

        var milibro = new Excel.Workbook();
        var mihoja = milibro.addWorksheet("Estado de cuenta");
        var micelda = mihoja.getCell("B2").value = "CUENTA: 4021658075     HSBC";
        mihoja.getCell("B4").value = "ARRENDAMIENTO";
        mihoja.getCell("B6").value = "FECHA";
        mihoja.getCell("C6").value = "CONCEPTO";
        mihoja.getCell("D6").value = "INGRESO";
        mihoja.getCell("E6").value = "EGRESO";
        mihoja.getCell("F6").value = "SALDO";
        micelda = mihoja.getCell("B7");

        mihoja.getColumn(3).width = 50;
        
        mihoja.columns = [
            { width: 5 },
            { width: 20 },
            { width: 50 },
            { width: 15 },
            { width: 15 },
            { width: 15 },
        ];
        
        fecha_inicial.setDate(fecha_inicial.getDate() - 1);
        fecha_final.setDate(fecha_final.getDate() + 1);
        fecha_inicial = fecha_inicial.toJSON().slice(0, 10);
        fecha_final = fecha_final.toJSON().slice(0, 10);
        
        const transacciones = await Transaccion.find({ fecha: { $gte: fecha_inicial, $lte: fecha_final }, adjuntoId: "transferencia", noContrato: 0, $or: [{tipo: "abono"}, {tipo: "egreso"}] }, {}, { sort: { 'fecha': 1, 'createdAt': 1 } });
        
        if(transacciones.length > 0) {
            let i = 7;
            let saldoAnt = 0;

            transacciones.forEach(t => {      
                if(i == 7){
                    saldoInicial = t.monto;
                }

                if(t.tipo == "abono") totalIngresos += t.monto;
                if(t.tipo == "egreso") totalEgresos += t.monto;

                mihoja.getCell(i, 2).value = new Date(t.fecha).toLocaleDateString("es-MX");
                mihoja.getCell(i, 3).value = t.concepto;
                if(t.tipo == "abono") mihoja.getCell(i, 4).value = t.monto;
                else if(t.tipo == "egreso") mihoja.getCell(i, 5).value = t.monto;
                
                if(t.concepto == "transaccion_inicial"){
                    t.saldo = t.monto;
                    saldoAnt = t.saldo;
                }else{
                    if(t.tipo == "abono") t.saldo = saldoAnt + t.monto;
                    else if(t.tipo == "egreso") t.saldo = saldoAnt - t.monto;
                    saldoAnt = t.saldo;
                }

                mihoja.getCell(i, 6).value = t.saldo;
                
                i = i + 1;
            });
            
            mihoja.getCell(i+3, 4).value = totalIngresos;
            mihoja.getCell(i+3, 5).value = totalEgresos;

            mihoja.getCell("E2").value = "Saldo inicial";
            mihoja.getCell("F2").value = saldoInicial;
        }else{
            console.log("madre mia")
            res.status(404).send(false);
        }

        milibro.xlsx
            .writeFile(absPath)
            .then(response => {
                
                fs.copyFileSync(absPath, destino);
                res.status(200).json(true);
                // res.download(__dirname + "\\archivos", "prueba.txt");
            })
            .catch(err => {
                console.log(err);
                res.status(404).send(false);
            });
        
    } catch (error) {
        console.log("0000000 this is the error: " + err);
    }
});

module.exports = router;