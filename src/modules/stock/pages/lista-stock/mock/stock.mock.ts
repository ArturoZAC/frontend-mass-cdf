import type { Product } from "../../../../products/pages/lista-productos/mock/products.mock";

export interface InventarioItem {
  id: number;
  producto: Product;
  cantidad: number;
  fechaActualizacion: string;
  createdAt: string;
}

export type TipoMovimiento = "ENTRADA" | "SALIDA" | "AJUSTE" | "VENTA";

export interface MovimientoInventario {
  id: number;
  producto: Product;
  empleado: { id: number; nombre: string };
  tipoMovimiento: TipoMovimiento;
  cantidad: number;
  justificacion: string | null;
  createdAt: string;
}

export type EstadoStock = "OPTIMO" | "STOCK_BAJO" | "AGOTADO";

export const getEstadoStock = (cantidad: number, stockMinimo: number): EstadoStock => {
  if (cantidad === 0) return "AGOTADO";
  if (cantidad <= stockMinimo) return "STOCK_BAJO";
  return "OPTIMO";
};

export const inventarioMock: InventarioItem[] = [
  {
    id: 1,
    producto: {
      id: 1,
      nombre: "Aceite Vegetal Mass 1L",
      codigo: "AV-102934-M",
      categoria: { id: 1, nombre: "Abarrotes" },
      proveedor: { id: 1, nombre: "Distribuidora Lima" },
      stock: 124,
      stockMinimo: 50,
      precio: 8.9,
      imagen: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=80&h=80&fit=crop",
      createdAt: "2026-06-01T08:00:00",
      updatedAt: "2026-06-10T10:00:00",
    },
    cantidad: 124,
    fechaActualizacion: "2026-06-10T10:00:00",
    createdAt: "2026-06-01T08:00:00",
  },
  {
    id: 2,
    producto: {
      id: 5,
      nombre: "Arroz Extra Costeño 5kg",
      codigo: "AR-334421-M",
      categoria: { id: 1, nombre: "Abarrotes" },
      proveedor: { id: 1, nombre: "Distribuidora Lima" },
      stock: 12,
      stockMinimo: 20,
      precio: 22.5,
      imagen: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=80&h=80&fit=crop",
      createdAt: "2026-06-01T08:00:00",
      updatedAt: "2026-06-10T08:00:00",
    },
    cantidad: 12,
    fechaActualizacion: "2026-06-09T14:00:00",
    createdAt: "2026-06-01T08:00:00",
  },
  {
    id: 3,
    producto: {
      id: 2,
      nombre: "Leche Evaporada Clásica 400g",
      codigo: "LC-448291-M",
      categoria: { id: 2, nombre: "Lácteos" },
      proveedor: { id: 2, nombre: "Gloria S.A." },
      stock: 0,
      stockMinimo: 40,
      precio: 3.8,
      imagen: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=80&h=80&fit=crop",
      createdAt: "2026-06-01T08:00:00",
      updatedAt: "2026-06-09T10:00:00",
    },
    cantidad: 0,
    fechaActualizacion: "2026-06-08T09:00:00",
    createdAt: "2026-06-01T08:00:00",
  },
  {
    id: 4,
    producto: {
      id: 3,
      nombre: "Detergente Líquido Aroma Limón 3L",
      codigo: "LM-992031-M",
      categoria: { id: 3, nombre: "Limpieza" },
      proveedor: null,
      stock: 45,
      stockMinimo: 20,
      precio: 12.5,
      imagen: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=80&h=80&fit=crop",
      createdAt: "2026-06-01T08:00:00",
      updatedAt: "2026-06-07T10:00:00",
    },
    cantidad: 45,
    fechaActualizacion: "2026-06-10T08:00:00",
    createdAt: "2026-06-01T08:00:00",
  },
  {
    id: 5,
    producto: {
      id: 6,
      nombre: "Atún en Trozos 170g",
      codigo: "AT-112233-M",
      categoria: { id: 5, nombre: "Conservas" },
      proveedor: null,
      stock: 8,
      stockMinimo: 30,
      precio: 4.2,
      imagen: "https://images.unsplash.com/photo-1597733336794-db1df7b104a1?w=80&h=80&fit=crop",
      createdAt: "2026-06-01T08:00:00",
      updatedAt: "2026-06-10T07:00:00",
    },
    cantidad: 8,
    fechaActualizacion: "2026-06-09T11:00:00",
    createdAt: "2026-06-01T08:00:00",
  },
];

export const movimientosMock: MovimientoInventario[] = [
  {
    id: 1,
    producto: inventarioMock[0].producto,
    empleado: { id: 1, nombre: "Carlos Ríos" },
    tipoMovimiento: "ENTRADA",
    cantidad: 50,
    justificacion: "Reposición semanal de proveedor",
    createdAt: "2026-06-10T08:30:00",
  },
  {
    id: 2,
    producto: inventarioMock[2].producto,
    empleado: { id: 2, nombre: "Ana Torres" },
    tipoMovimiento: "VENTA",
    cantidad: 12,
    justificacion: null,
    createdAt: "2026-06-10T09:15:00",
  },
  {
    id: 3,
    producto: inventarioMock[1].producto,
    empleado: { id: 1, nombre: "Carlos Ríos" },
    tipoMovimiento: "AJUSTE",
    cantidad: 5,
    justificacion: "Corrección por conteo físico",
    createdAt: "2026-06-09T14:00:00",
  },
  {
    id: 4,
    producto: inventarioMock[4].producto,
    empleado: { id: 2, nombre: "Ana Torres" },
    tipoMovimiento: "SALIDA",
    cantidad: 3,
    justificacion: "Producto dañado retirado",
    createdAt: "2026-06-09T11:00:00",
  },
  {
    id: 5,
    producto: inventarioMock[3].producto,
    empleado: { id: 3, nombre: "Luis Paredes" },
    tipoMovimiento: "ENTRADA",
    cantidad: 30,
    justificacion: "Compra directa proveedor",
    createdAt: "2026-06-08T16:00:00",
  },
];
