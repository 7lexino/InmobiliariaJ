export interface Propiedad {
    _id: string,
    predial: string,
    tipo: string,
    estadoRenta: string,
    direccion: {
        calle: string,
        no_ext: string,
        no_int: string,
        colonia: string,
        c_p: number,
        ciudad: string,
        estado: string
    }
}
