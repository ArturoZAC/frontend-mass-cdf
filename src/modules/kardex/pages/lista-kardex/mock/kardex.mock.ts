export const TipoMovimiento = {
  ENTRADA: "ENTRADA",
  SALIDA: "SALIDA",
  AJUSTE: "AJUSTE",
  VENTA: "VENTA",
} as const;

export type TipoMovimiento = (typeof TipoMovimiento)[keyof typeof TipoMovimiento];

export interface MovimientoInventario {
  id: number;
  createdAt: string;
  producto: { id: number; nombre: string };
  empleado: { id: number; nombre: string; apellido: string };
  tipoMovimiento: TipoMovimiento;
  cantidad: number;
  justificacion: string;
}

export const kardexMock: MovimientoInventario[] = [
  {
    id: 1,
    createdAt: "2024-05-24T14:20:00",
    producto: { id: 1, nombre: "Arroz Extra Costeño 5kg" },
    empleado: { id: 1, nombre: "Juan", apellido: "Sánchez" },
    tipoMovimiento: TipoMovimiento.ENTRADA,
    cantidad: 50,
    justificacion: "Reposición de stock",
  },
  {
    id: 2,
    createdAt: "2024-05-24T13:45:00",
    producto: { id: 2, nombre: "Leche Evaporada Gloria 400g" },
    empleado: { id: 2, nombre: "María", apellido: "Rojas" },
    tipoMovimiento: TipoMovimiento.SALIDA,
    cantidad: 24,
    justificacion: "Despacho a tienda",
  },
  {
    id: 3,
    createdAt: "2024-05-24T12:10:00",
    producto: { id: 3, nombre: "Aceite Primor Premium 1L" },
    empleado: { id: 1, nombre: "Juan", apellido: "Sánchez" },
    tipoMovimiento: TipoMovimiento.ENTRADA,
    cantidad: 120,
    justificacion: "Compra a proveedor",
  },
  {
    id: 4,
    createdAt: "2024-05-24T11:30:00",
    producto: { id: 4, nombre: "Fideos Don Vittorio Spaguetti" },
    empleado: { id: 3, nombre: "Carlos", apellido: "Pérez" },
    tipoMovimiento: TipoMovimiento.VENTA,
    cantidad: 15,
    justificacion: "Venta directa",
  },
  {
    id: 5,
    createdAt: "2024-05-24T09:15:00",
    producto: { id: 5, nombre: "Detergente Ariel 1kg" },
    empleado: { id: 2, nombre: "María", apellido: "Rojas" },
    tipoMovimiento: TipoMovimiento.ENTRADA,
    cantidad: 30,
    justificacion: "Reposición de stock",
  },
  {
    id: 6,
    createdAt: "2024-05-23T16:00:00",
    producto: { id: 1, nombre: "Arroz Extra Costeño 5kg" },
    empleado: { id: 3, nombre: "Carlos", apellido: "Pérez" },
    tipoMovimiento: TipoMovimiento.AJUSTE,
    cantidad: 5,
    justificacion: "Ajuste por inventario físico",
  },
  {
    id: 7,
    createdAt: "2024-05-23T14:30:00",
    producto: { id: 6, nombre: "Coca Cola 500ml" },
    empleado: { id: 1, nombre: "Juan", apellido: "Sánchez" },
    tipoMovimiento: TipoMovimiento.SALIDA,
    cantidad: 60,
    justificacion: "Despacho a tienda",
  },
];
