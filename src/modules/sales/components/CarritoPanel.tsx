import { IconShoppingCart, IconReceipt, IconFileText } from "@tabler/icons-react";
import { type CarritoItem as ICarritoItem } from "../interfaces/sales.interfaces";
import { CarritoItem } from "./CarritoItem";

interface Props {
  items: ICarritoItem[];
  onIncrementar: (id: number) => void;
  onDecrementar: (id: number) => void;
  onEliminar: (id: number) => void;
  onConfirmar: (tipo: "ticket" | "boleta") => void;
}

export const CarritoPanel = ({
  items,
  onIncrementar,
  onDecrementar,
  onEliminar,
  onConfirmar,
}: Props) => {
  const subtotal = items.reduce((acc, i) => acc + i.subtotal, 0);
  const igv = subtotal * 0.18;
  const total = subtotal + igv;

  return (
    <aside className="w-72 flex flex-col bg-white border-l border-gray-200">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <IconShoppingCart size={18} className="text-[#0D2DAA]" />
          <span className="btn-sans font-bold text-sm text-[#0a0a0a]">Carrito de Compra</span>
        </div>
        {items.length > 0 && (
          <span className="btn-sans text-xs font-bold w-5 h-5 rounded-full bg-[#B5000B] text-white flex items-center justify-center">
            {items.length}
          </span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-2 text-[#6b7280]">
            <IconShoppingCart size={40} className="text-gray-300" />
            <p className="small text-center">No hay productos en la lista</p>
          </div>
        ) : (
          items.map((item) => (
            <CarritoItem
              key={item.producto.id}
              item={item}
              onIncrementar={onIncrementar}
              onDecrementar={onDecrementar}
              onEliminar={onEliminar}
            />
          ))
        )}
      </div>

      <div className="border-t border-gray-200 px-4 py-3">
        <div className="flex justify-between mb-1">
          <span className="small text-[#6b7280]">Subtotal</span>
          <span className="small text-[#0a0a0a]">S/ {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-3">
          <span className="small text-[#6b7280]">IGV (18%)</span>
          <span className="small text-[#0a0a0a]">S/ {igv.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="btn-sans font-bold text-sm text-[#0a0a0a]">TOTAL</span>
          <span className="btn-sans font-bold text-sm text-[#B5000B]">S/ {total.toFixed(2)}</span>
        </div>

        <div className="flex gap-2 mb-3">
          <button
            onClick={() => onConfirmar("ticket")}
            className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 btn-sans text-xs font-medium cursor-pointer"
          >
            <IconReceipt size={14} /> Ticket
          </button>
          <button
            onClick={() => onConfirmar("boleta")}
            className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 btn-sans text-xs font-medium cursor-pointer"
          >
            <IconFileText size={14} /> Boleta/Fact.
          </button>
        </div>

        <button
          onClick={() => onConfirmar("ticket")}
          disabled={items.length === 0}
          className="w-full py-3 rounded-xl bg-[#FFD101] hover:bg-[#e6bc00] disabled:opacity-50 disabled:cursor-not-allowed transition-colors btn-sans font-bold text-sm text-[#0a0a0a] flex items-center justify-center gap-2 cursor-pointer"
        >
          CONFIRMAR VENTA ✓
        </button>
      </div>
    </aside>
  );
};
