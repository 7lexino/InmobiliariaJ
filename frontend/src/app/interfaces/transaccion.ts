export interface Transaccion {
    _id: string,
    fecha: string,
    concepto: string,
    tipo: string,
    monto: number,
    saldo: number,
    adjunto: string,
    inquilinoId: string
}