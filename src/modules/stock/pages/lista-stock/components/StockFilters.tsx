import { IconAdjustmentsHorizontal } from "@tabler/icons-react";

interface Props {
  categoriaSeleccionada: string;
  estadoSeleccionado: string;
  categorias: string[];
  onCategoriaChange: (v: string) => void;
  onEstadoChange: (v: string) => void;
  onLimpiar: () => void;
}

const ESTADOS = [
  { value: "TODOS", label: "Todos" },
  { value: "AGOTADO", label: "Crítico" },
];

export const StockFilters = ({
  categoriaSeleccionada,
  estadoSeleccionado,
  categorias,
  onCategoriaChange,
  onEstadoChange,
  onLimpiar,
}: Props) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: 16,
            fontWeight: 700,
          }}
        >
          Filtros Rápidos
        </h2>
        <button
          onClick={onLimpiar}
          className="flex items-center gap-1.5 text-red-600 hover:text-red-700 transition-colors"
        >
          <IconAdjustmentsHorizontal size={16} />
          <small className="small-danger" style={{ fontWeight: 500 }}>
            Limpiar
          </small>
        </button>
      </div>

      <div className="flex flex-wrap gap-4">
        {/* Categoría */}
        <div className="flex flex-col gap-1">
          <small
            className="small-muted"
            style={{
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontWeight: 600,
            }}
          >
            Categoría
          </small>
          <select
            value={categoriaSeleccionada}
            onChange={(e) => onCategoriaChange(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 cursor-pointer"
          >
            <option value="TODAS">Todas</option>
            {categorias.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Estado de stock */}
        <div className="flex flex-col gap-1">
          <small
            className="small-muted"
            style={{
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontWeight: 600,
            }}
          >
            Estado de Stock
          </small>
          <div className="flex gap-2">
            {ESTADOS.map((e) => (
              <button
                key={e.value}
                onClick={() => onEstadoChange(e.value)}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                  estadoSeleccionado === e.value
                    ? "bg-yellow-400 text-gray-900"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {e.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
