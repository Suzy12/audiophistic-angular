import { Producto_Albumes } from "./producto_albumes";
import { Producto_Audifonos } from "./producto_audifonos";
import { Tipo_Producto } from "./tipo_producto";

export interface Producto {
    id_creador: number,
    titulo: string,
    id_producto: number,
    nombre_creador: string,
    caracteristicas: Producto_Audifonos|Producto_Albumes,
    descripcion?: string,
    enlace?: string,
    fecha_lanzamiento?: Date,
    id_blog?: any,
    precio?: number,
    tiempo_envio?: number
}