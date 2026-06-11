import { type Producto } from "../interfaces/sales.interfaces";
import { ProductoCard } from "./ProductoCard";

interface Props {
  productos: Producto[];
  onAgregar: (producto: Producto) => void;
}

export const ProductosGrid = ({ productos, onAgregar }: Props) => (
  <div className="flex-1 overflow-y-auto p-4">
    {productos.length === 0 ? (
      <div className="flex items-center justify-center h-full text-[#6b7280]">
        <p className="p-muted">No hay productos en esta categoría.</p>
      </div>
    ) : (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {productos.map((p) => (
          <ProductoCard key={p.id} producto={p} onAgregar={onAgregar} />
        ))}
      </div>
    )}
  </div>
);
