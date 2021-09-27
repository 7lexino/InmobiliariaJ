import { Propiedad } from "./propiedad";
import { Inquilino } from "./inquilino";

export interface Contrato {
    _id: string,
    noContrato: number,
    tipo: boolean, //True=facturado, False=No facturado
    fechaInicio: string,
    fechaCierre: string,
    saldo: number,
    aval: {
        nombre: string,
        correo: string,
        telefono1: string,
        telefono2: string,
    },
    costoInicial: number,
    costoPeriodo: number,
    propiedad: {
        _id: string,
        predial: string,
        direccion: {
            calle: string,
            no_ext: string,
            no_int: string,
            colonia: string,
            c_p: number,
            ciudad: string,
            estado: string
        }
    },
    inquilino: {
        _id: string,
        empresa: string,
        contacto: {
            nombre: string,
            apellidos: string,
            correo: string,
            telefono1: string,
            telefono2: string,
        }
    }
}
