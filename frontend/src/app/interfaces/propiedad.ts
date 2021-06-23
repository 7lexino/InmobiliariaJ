export interface Propiedad {
    _id: string,
    predial: string,
    tipo: string,
    estadoRenta: string,
    direccion: {
        calle: String,
        no_ext: Number,
        no_int: Number,
        colonia: String,
        c_p: Number,
        ciudad: String,
        estado: String
    }
}
