import { IconTrash, IconMinus, IconPlus } from "@tabler/icons-react";
import { type CarritoItem as ICarritoItem } from "../interfaces/sales.interfaces";

interface Props {
  item: ICarritoItem;
  onIncrementar: (id: number) => void;
  onDecrementar: (id: number) => void;
  onEliminar: (id: number) => void;
}

export const CarritoItem = ({ item, onIncrementar, onDecrementar, onEliminar }: Props) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
    <div className="flex-1 min-w-0 mr-2">
      <p className="btn-sans text-xs font-semibold text-[#0a0a0a] leading-tight truncate">
        {item.producto.nombre}
      </p>
      <p className="small text-[#B5000B] font-bold mt-0.5">S/ {item.subtotal.toFixed(2)}</p>
    </div>
    <div className="flex items-center gap-1">
      <button
        onClick={() => onDecrementar(item.producto.id)}
        className="w-6 h-6 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center cursor-pointer"
      >
        <IconMinus size={12} />
      </button>
      <span className="btn-sans text-sm font-bold w-6 text-center">{item.cantidad}</span>
      <button
        onClick={() => onIncrementar(item.producto.id)}
        className="w-6 h-6 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center cursor-pointer"
      >
        <IconPlus size={12} />
      </button>
      <button
        onClick={() => onEliminar(item.producto.id)}
        className="w-6 h-6 rounded-md hover:bg-red-100 flex items-center justify-center ml-1 cursor-pointer"
      >
        <IconTrash size={12} className="text-[#B5000B]" />
      </button>
    </div>
  </div>
);
