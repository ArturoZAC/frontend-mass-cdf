import { motion } from "framer-motion";
import { IconMapPin } from "@tabler/icons-react";
import { type InventarioItem, getEstadoStock } from "../mock/stock.mock";
import { StockBadge } from "./ui/StockBadge";

interface Props {
  items: InventarioItem[];
}

const colorCantidad = (cantidad: number, minimo: number) => {
  if (cantidad === 0) return "text-red-600";
  if (cantidad <= minimo) return "text-orange-500";
  return "text-green-600";
};

export const StockGrid = ({ items }: Props) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="p-muted">No hay productos que coincidan con los filtros.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item, i) => {
        const estado = getEstadoStock(item.cantidad, item.producto.stockMinimo);
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.05 }}
            className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-3 hover:shadow-md transition-shadow"
          >
            {/* Imagen + badge */}
            <div className="relative">
              <img
                src={item.producto.imagen}
                alt={item.producto.nombre}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="absolute top-0 right-0">
                <StockBadge estado={estado} />
              </div>
            </div>

            {/* Info */}
            <div>
              <p style={{ fontWeight: 600, fontSize: 13, lineHeight: 1.3 }}>
                {item.producto.nombre}
              </p>
              <small className="small-muted">
                SKU: {item.producto.codigo.replace(/\D/g, "").slice(0, 7)}
              </small>
            </div>

            <hr className="border-gray-100" />

            {/* Stats */}
            <div className="flex justify-between items-start">
              <div>
                <small
                  className="small-muted"
                  style={{
                    textTransform: "uppercase",
                    fontSize: 10,
                    letterSpacing: "0.08em",
                  }}
                >
                  Disponible
                </small>
                <p
                  className={`${colorCantidad(item.cantidad, item.producto.stockMinimo)} font-bold`}
                  style={{ fontSize: 14 }}
                >
                  {item.cantidad} uds
                </p>
              </div>
              <div>
                <small
                  className="small-muted"
                  style={{
                    textTransform: "uppercase",
                    fontSize: 10,
                    letterSpacing: "0.08em",
                  }}
                >
                  Ubicación
                </small>
                <div className="flex items-center gap-0.5">
                  <IconMapPin size={12} className="text-gray-400" />
                  <small style={{ fontWeight: 600, fontSize: 12 }}>
                    {item.producto.categoria.nombre.slice(0, 2).toUpperCase()}-
                    {String(item.producto.id).padStart(2, "0")}
                  </small>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
