import { motion } from "framer-motion";
import {
  IconArrowUpRight,
  IconArrowDownRight,
  IconRefresh,
  IconShoppingCart,
  IconDotsVertical,
} from "@tabler/icons-react";
import { type MovimientoInventario, type TipoMovimiento } from "../mock/stock.mock";

interface Props {
  movimientos: MovimientoInventario[];
}

const tipoConfig: Record<
  TipoMovimiento,
  { label: string; icon: React.ReactNode; color: string; bg: string }
> = {
  ENTRADA: {
    label: "Entrada",
    icon: <IconArrowUpRight size={14} />,
    color: "text-green-700",
    bg: "bg-green-100",
  },
  SALIDA: {
    label: "Salida",
    icon: <IconArrowDownRight size={14} />,
    color: "text-red-600",
    bg: "bg-red-100",
  },
  AJUSTE: {
    label: "Ajuste",
    icon: <IconRefresh size={14} />,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  VENTA: {
    label: "Venta",
    icon: <IconShoppingCart size={14} />,
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
};

const getEstadoLabel = (cantidad: number, minimo: number) => {
  if (cantidad === 0) return { label: "AGOTADO", className: "bg-red-100 text-red-600" };
  if (cantidad <= minimo)
    return { label: "STOCK BAJO", className: "bg-orange-100 text-orange-500" };
  return { label: "ÓPTIMO", className: "bg-green-100 text-green-700" };
};

const formatFecha = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const StockMovimientosTable = ({ movimientos }: Props) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {movimientos.map((mov, i) => {
        const tipo = tipoConfig[mov.tipoMovimiento];
        const estado = getEstadoLabel(mov.producto.stock, mov.producto.stockMinimo);
        return (
          <motion.div
            key={mov.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: i * 0.05 }}
            className={`flex items-center gap-4 px-4 py-3 ${
              i !== movimientos.length - 1 ? "border-b border-gray-100" : ""
            } hover:bg-gray-50 transition-colors`}
          >
            {/* Imagen */}
            <img
              src={mov.producto.imagen}
              alt={mov.producto.nombre}
              className="w-9 h-9 rounded-lg object-cover flex-shrink-0"
            />

            {/* Nombre + SKU + categoría */}
            <div className="flex-1 min-w-0">
              <p style={{ fontWeight: 600, fontSize: 13 }} className="truncate">
                {mov.producto.nombre}
              </p>
              <small className="small-muted">
                SKU: {mov.producto.codigo.replace(/\D/g, "").slice(0, 7)} |{" "}
                {mov.producto.categoria.nombre}
              </small>
            </div>

            {/* Tipo de movimiento */}
            <div
              className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${tipo.bg} ${tipo.color} flex-shrink-0`}
            >
              {tipo.icon}
              <small style={{ fontWeight: 600, fontSize: 11 }}>{tipo.label}</small>
            </div>

            {/* Mínimo */}
            <div className="text-center flex-shrink-0 hidden md:block">
              <small
                className="small-muted block"
                style={{ fontSize: 10, textTransform: "uppercase" }}
              >
                MIN.
              </small>
              <p style={{ fontSize: 13, fontWeight: 600 }}>{mov.producto.stockMinimo}</p>
            </div>

            {/* Cantidad movida */}
            <div className="text-center flex-shrink-0">
              <small
                className="small-muted block"
                style={{ fontSize: 10, textTransform: "uppercase" }}
              >
                CANT.
              </small>
              <p style={{ fontSize: 13, fontWeight: 700 }}>{mov.cantidad} uds</p>
            </div>

            {/* Estado */}
            <div className="flex-shrink-0 hidden md:block">
              <small
                className="small-muted block"
                style={{ fontSize: 10, textTransform: "uppercase" }}
              >
                ESTADO
              </small>
              <span className={`h1-badge px-2 py-0.5 rounded-full ${estado.className}`}>
                {estado.label}
              </span>
            </div>

            {/* Fecha */}
            <div className="flex-shrink-0 hidden lg:block">
              <small className="small-muted">{formatFecha(mov.createdAt)}</small>
            </div>

            {/* Menú */}
            <button className="text-gray-400 hover:text-gray-600 flex-shrink-0">
              <IconDotsVertical size={16} />
            </button>
          </motion.div>
        );
      })}
    </div>
  );
};
