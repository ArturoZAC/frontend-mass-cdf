export interface Categoria {
  id: number;
  nombre: string;
  descripcion?: string;
}

export interface Producto {
  id: number;
  codigo: string;
  nombre: string;
  precio: number;
  stock: number;
  stockMinimo: number;
  categoria: Categoria;
}

export interface CarritoItem {
  producto: Producto;
  cantidad: number;
  subtotal: number;
}
