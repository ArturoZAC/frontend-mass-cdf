import { useState } from "react";
import { IconSearch, IconAdjustments } from "@tabler/icons-react";

const categorias = ["Todas", "Abarrotes", "Lácteos", "Bebidas", "Limpieza", "Conservas"];

interface ProductsFiltersProps {
  onSearch: (q: string) => void;
  onFilter: (cat: string) => void;
}

export const ProductsFilters = ({ onSearch, onFilter }: ProductsFiltersProps) => {
  const [active, setActive] = useState("Todas");

  const handleFilter = (cat: string) => {
    setActive(cat);
    onFilter(cat);
  };

  return (
    <div className="flex items-center gap-4 mb-6 flex-wrap">
      <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2.5 flex-1 min-w-48">
        <IconSearch size={16} className="text-gray-400" />
        <input
          type="text"
          placeholder="Buscar por nombre o SKU..."
          onChange={(e) => onSearch(e.target.value)}
          className="outline-none text-sm text-gray-600 w-full placeholder:text-gray-400 bg-transparent"
        />
      </div>

      <span className="text-sm text-gray-500 font-medium">Filtrar por:</span>

      <div className="flex items-center gap-2 flex-wrap">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => handleFilter(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer
              ${
                active === cat
                  ? "bg-[#B5000B] text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors cursor-pointer ml-auto">
        <IconAdjustments size={16} className="text-gray-500" />
        <span className="text-xs text-gray-600 font-medium">Filtros Avanzados</span>
      </button>
    </div>
  );
};
