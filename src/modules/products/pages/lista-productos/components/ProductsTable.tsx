import { IconPencil, IconTrash, IconPhoto } from "@tabler/icons-react";
import { CategoryBadge } from "./ui/CategoryBadge";
import { StockBar } from "./ui/StockBar";
import type { ProductoResponse } from "../../../api/products.api";
import { getEnvs } from "../../../../../shared/helpers/get-envs";

interface ProductsTableProps {
  products: ProductoResponse[];
  onEdit: (product: ProductoResponse) => void;
  onDelete: (product: ProductoResponse) => void;
}

const { BASE_URL_IMAGES } = getEnvs();

const timeAgo = (dateStr: string): string => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (hours < 1) return "hace menos de 1h";
  if (hours < 24) return `hace ${hours}h`;
  return `hace ${days}d`;
};

export const ProductsTable = ({ products, onEdit, onDelete }: ProductsTableProps) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="grid grid-cols-[60px_1fr_140px_130px_180px_100px] px-4 py-3 border-b border-gray-100 bg-gray-50">
        {["IMAGEN", "PRODUCTO", "SKU", "CATEGORÍA", "STOCK", "ACCIONES"].map((col) => (
          <span key={col} className="h1-badge text-[10px] text-gray-400 text-center">
            {col}
          </span>
        ))}
      </div>

      {products.length === 0 ? (
        <div className="px-4 py-12 text-center">
          <p className="p-muted text-sm">No se encontraron productos.</p>
        </div>
      ) : (
        products.map((product, i) => (
          <div
            key={product.id}
            className={`grid grid-cols-[60px_1fr_140px_130px_180px_100px] px-4 py-3 items-center
              ${i !== products.length - 1 ? "border-b border-gray-50" : ""}
              hover:bg-gray-50 transition-colors`}
          >
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 mx-auto">
              {product.imagenUrl ? (
                <img
                  src={`${BASE_URL_IMAGES}${product.imagenUrl}`}
                  alt={product.nombre}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <IconPhoto size={18} className="text-gray-400" />
                </div>
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-[#1a1a1a] text-center">{product.nombre}</p>
              <p className="text-xs text-gray-400 mt-0.5 text-center">
                Actualizado {timeAgo(product.updatedAt)}
              </p>
            </div>

            <span className="text-xs text-gray-500 font-mono text-center">{product.codigo}</span>

            <CategoryBadge categoria={product.categoria.nombre} />

            <StockBar stock={product.stock} stockMinimo={product.stockMinimo} />

            <div className="flex items-center gap-2 mx-auto">
              <button
                onClick={() => onEdit(product)}
                className="p-1.5 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
              >
                <IconPencil size={16} className="text-blue-500" />
              </button>
              <button
                onClick={() => onDelete(product)}
                className="p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
              >
                <IconTrash size={16} className="text-red-500" />
              </button>
            </div>
          </div>
        ))
      )}

      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
        <span className="text-xs text-gray-400">Mostrando {products.length} productos</span>
      </div>
    </div>
  );
};
