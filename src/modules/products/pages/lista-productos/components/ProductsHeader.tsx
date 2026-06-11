import { IconPlus } from "@tabler/icons-react";

interface ProductsHeaderProps {
  onAdd: () => void;
}

export const ProductsHeader = ({ onAdd }: ProductsHeaderProps) => {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h3 className="font-black" style={{ fontFamily: "var(--font-heading)" }}>
          Gestión de Productos
        </h3>
        <p className="p-muted text-sm mt-1">
          Visualiza y actualiza el catálogo maestro de la tienda.
        </p>
      </div>
      <button
        onClick={onAdd}
        className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#FFD101] hover:bg-[#e6bc00] transition-colors cursor-pointer"
      >
        <IconPlus size={18} className="text-[#1a1a1a]" />
        <span className="btn-sans text-sm font-bold text-[#1a1a1a]">Agregar Producto</span>
      </button>
    </div>
  );
};
