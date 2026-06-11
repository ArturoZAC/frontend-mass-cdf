import { type Producto } from "../interfaces/sales.interfaces";

interface Props {
  producto: Producto;
  onAgregar: (producto: Producto) => void;
}

export const ProductoCard = ({ producto, onAgregar }: Props) => {
  const stockBajo = producto.stock <= producto.stockMinimo;
  return (
    <div
      onClick={() => producto.stock > 0 && onAgregar(producto)}
      className={`bg-white rounded-xl border border-gray-200 p-3 flex flex-col gap-2 cursor-pointer hover:border-[#FFD101] hover:shadow-md transition-all
        ${producto.stock === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <div className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
        <span className="text-3xl">🛒</span>
      </div>
      <p className="btn-sans text-xs font-semibold text-[#0a0a0a] leading-tight line-clamp-2">
        {producto.nombre}
      </p>
      <div className="flex items-center justify-between">
        <span className="btn-sans font-bold text-[#B5000B] text-sm">
          S/ {producto.precio.toFixed(2)}
        </span>
        <div className="flex items-center gap-1">
          {stockBajo && (
            <span className="btn-sans text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-100 text-red-600">
              STOCK BAJO
            </span>
          )}
          <span className="small text-[#6b7280]">STOCK: {producto.stock}</span>
        </div>
      </div>
    </div>
  );
};
