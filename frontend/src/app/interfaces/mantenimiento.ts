import { Propiedad } from "./propiedad";

export interface Mantenimiento {
    _id: string,
    fecha: string,
    descripcion: string,
    costo: number,
    propiedadId: string
}