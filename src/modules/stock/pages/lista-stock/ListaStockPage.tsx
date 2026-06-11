import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { IconPackage, IconAlertTriangle, IconCircleCheck } from "@tabler/icons-react";
import { inventarioMock, movimientosMock } from "./mock/stock.mock";
import { StockFilters } from "./components/StockFilters";
import { StockGrid } from "./components/StockGrid";
import { StockMovimientosTable } from "./components/StockMovimientosTable";

const categorias = [...new Set(inventarioMock.map((i) => i.producto.categoria.nombre))];

export const ListaStockPage = () => {
  const [categoria, setCategoria] = useState("TODAS");
  const [estado, setEstado] = useState("TODOS");

  const handleLimpiar = () => {
    setCategoria("TODAS");
    setEstado("TODOS");
  };

  const itemsFiltrados = useMemo(() => {
    return inventarioMock.filter((item) => {
      const matchCategoria = categoria === "TODAS" || item.producto.categoria.nombre === categoria;
      const matchEstado =
        estado === "TODOS" || (estado === "AGOTADO" && item.cantidad <= item.producto.stockMinimo);
      return matchCategoria && matchEstado;
    });
  }, [categoria, estado]);

  const totalProductos = inventarioMock.length;
  const criticos = inventarioMock.filter(
    (i) => i.cantidad > 0 && i.cantidad <= i.producto.stockMinimo,
  ).length;
  const agotados = inventarioMock.filter((i) => i.cantidad === 0).length;

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Stats rápidas */}
      <div className="grid grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-3"
        >
          <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
            <IconPackage size={18} className="text-blue-600" />
          </div>
          <div>
            <small className="small-muted" style={{ fontSize: 11, textTransform: "uppercase" }}>
              Total productos
            </small>
            <p style={{ fontWeight: 700, fontSize: 20 }}>{totalProductos}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.05 }}
          className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-3"
        >
          <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
            <IconAlertTriangle size={18} className="text-orange-500" />
          </div>
          <div>
            <small className="small-muted" style={{ fontSize: 11, textTransform: "uppercase" }}>
              Stock bajo
            </small>
            <p
              style={{
                fontWeight: 700,
                fontSize: 20,
                color: "var(--color-danger)",
              }}
            >
              {criticos}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.1 }}
          className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-3"
        >
          <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
            <IconCircleCheck size={18} className="text-green-600" />
          </div>
          <div>
            <small className="small-muted" style={{ fontSize: 11, textTransform: "uppercase" }}>
              Agotados
            </small>
            <p style={{ fontWeight: 700, fontSize: 20 }}>{agotados}</p>
          </div>
        </motion.div>
      </div>

      {/* Filtros */}
      <StockFilters
        categoriaSeleccionada={categoria}
        estadoSeleccionado={estado}
        categorias={categorias}
        onCategoriaChange={setCategoria}
        onEstadoChange={setEstado}
        onLimpiar={handleLimpiar}
      />

      {/* Grid de inventario */}
      <div>
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: 15,
            fontWeight: 700,
            marginBottom: 12,
          }}
        >
          Estado de Inventario
        </h2>
        <StockGrid items={itemsFiltrados} />
      </div>

      {/* Últimos movimientos */}
      <div>
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: 15,
            fontWeight: 700,
            marginBottom: 12,
          }}
        >
          Últimos Movimientos
        </h2>
        <StockMovimientosTable movimientos={movimientosMock} />
      </div>
    </div>
  );
};
