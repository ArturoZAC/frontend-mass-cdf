export interface Categoria {
  id: number;
  nombre: string;
}

export interface Proveedor {
  id: number;
  nombre: string;
}

export interface Product {
  id: number;
  codigo: string;
  categoria: Categoria;
  proveedor: Proveedor | null;
  nombre: string;
  precio: number;
  stock: number;
  stockMinimo: number;
  imagen: string;
  createdAt: string;
  updatedAt: string;
}

export const productsMock: Product[] = [
  {
    id: 1,
    nombre: "Aceite Vegetal Mass 1L",
    codigo: "AV-102934-M",
    categoria: { id: 1, nombre: "Abarrotes" },
    proveedor: { id: 1, nombre: "Distribuidora Lima" },
    stock: 840,
    stockMinimo: 50,
    precio: 8.9,
    imagen: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=80&h=80&fit=crop",
    createdAt: "2026-06-01T08:00:00",
    updatedAt: "2026-06-10T10:00:00",
  },
  {
    id: 2,
    nombre: "Leche Evaporada Clásica 400g",
    codigo: "LC-448291-M",
    categoria: { id: 2, nombre: "Lácteos" },
    proveedor: { id: 2, nombre: "Gloria S.A." },
    stock: 45,
    stockMinimo: 40,
    precio: 3.8,
    imagen: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=80&h=80&fit=crop",
    createdAt: "2026-06-01T08:00:00",
    updatedAt: "2026-06-09T10:00:00",
  },
  {
    id: 3,
    nombre: "Detergente Líquido Aroma Limón 3L",
    codigo: "LM-992031-M",
    categoria: { id: 3, nombre: "Limpieza" },
    proveedor: null,
    stock: 2,
    stockMinimo: 20,
    precio: 12.5,
    imagen: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=80&h=80&fit=crop",
    createdAt: "2026-06-01T08:00:00",
    updatedAt: "2026-06-07T10:00:00",
  },
  {
    id: 4,
    nombre: "Gaseosa Cola 2.5L Pack 6",
    codigo: "BE-229103-M",
    categoria: { id: 4, nombre: "Bebidas" },
    proveedor: { id: 3, nombre: "Arca Continental" },
    stock: 120,
    stockMinimo: 30,
    precio: 18.9,
    imagen: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=80&h=80&fit=crop",
    createdAt: "2026-06-01T08:00:00",
    updatedAt: "2026-06-10T09:00:00",
  },
  {
    id: 5,
    nombre: "Arroz Extra Costeño 5kg",
    codigo: "AR-334421-M",
    categoria: { id: 1, nombre: "Abarrotes" },
    proveedor: { id: 1, nombre: "Distribuidora Lima" },
    stock: 200,
    stockMinimo: 50,
    precio: 22.5,
    imagen: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=80&h=80&fit=crop",
    createdAt: "2026-06-01T08:00:00",
    updatedAt: "2026-06-10T08:00:00",
  },
  {
    id: 6,
    nombre: "Atún en Trozos 170g",
    codigo: "AT-112233-M",
    categoria: { id: 5, nombre: "Conservas" },
    proveedor: null,
    stock: 68,
    stockMinimo: 30,
    precio: 4.2,
    imagen: "https://images.unsplash.com/photo-1597733336794-db1df7b104a1?w=80&h=80&fit=crop",
    createdAt: "2026-06-01T08:00:00",
    updatedAt: "2026-06-10T07:00:00",
  },
];
