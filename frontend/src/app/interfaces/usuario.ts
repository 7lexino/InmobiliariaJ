//Rangos existentes
//1 - operador = Operación del sistema pero sin poder crear, eliminar ni modificar catálogos
//2 - editor = Puede crear, eliminar y modificar catálogos
//3 - admin = Todo lo anterior + crear nuevos usuarios

export interface Usuario {
    _id: string,
    nombre: string,
    nick: string,
    correo: string,
    contra: string,
    rango: number
}