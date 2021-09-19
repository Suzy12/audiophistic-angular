import { Tipos_Productos } from "./tipos_productos";

export interface Producto {
    id_creador: number,
    titulo: string,
    id_producto: number,
    nombre_creador: string,
    caracteristicas: Tipos_Productos,
    descripcion?: string,
    enlace?: string,
    fecha_lanzamiento?: Date,
    id_blog?: any,
    precio?: number,
    tiempo_envio?: number
}