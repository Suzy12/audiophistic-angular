import { Producto } from "./Productos/productos";

export interface Carrito {
    items: Producto[];
    cambiado: boolean;
}