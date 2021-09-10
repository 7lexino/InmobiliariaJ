export interface Transaccion {
    _id: string,
    fecha: string,
    tipo: string, //Cargo, Abono o Egreso (Juguel)
    concepto: string,
    monto: number,
    saldo: number,
    adjuntoId: string, //Factura o remisión
    noContrato: number,
    createdAt: string
}