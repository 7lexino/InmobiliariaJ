export interface Inquilino {
    _id: string,
    tipo: boolean, //Individuo o Empresa
    empresa: string, //Nombre de la Compañía
    contacto: { //Información personal del contacto
        nombre: string,
        apellidos: string,
        correo: string,
        telefono1: string,
        telefono2: string,
    }
}
