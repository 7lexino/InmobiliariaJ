export interface Transaccion {
    _id: string,
    tipo: string, //Cargo o Abono
    concepto: string,
    monto: number,
    saldo: number,
    adjuntoId: string, //Factura o remisión
    noContrato: number,
    createdAt: string
}