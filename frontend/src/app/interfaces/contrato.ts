import { Propiedad } from "./propiedad";
import { Inquilino } from "./inquilino";

export interface Contrato {
    _id: string,
    noContrato: number,
    tipo: boolean,
    fechaInicio: string,
    fechaCierre: string,
    aval: {
        nombre: string,
        correo: string,
        telefono1: string,
        telefono2: string,
    },
    costoInicial: number,
    costoPeriodo: number,
    propiedadId: string,
    propiedad: Propiedad[],
    inquilinoId: string,
    inquilino: Inquilino[]
}
