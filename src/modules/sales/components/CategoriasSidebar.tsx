import {
  IconLayoutGrid,
  IconBottle,
  IconBread,
  IconMilk,
  IconSpray,
  IconShoppingBag,
  IconQuestionMark,
  IconHelp,
  IconDoorExit,
} from "@tabler/icons-react";
import { type Categoria } from "../interfaces/sales.interfaces";

const iconMap: Record<string, React.ReactNode> = {
  Todas: <IconLayoutGrid size={18} />,
  Bebidas: <IconBottle size={18} />,
  Panadería: <IconBread size={18} />,
  Lácteos: <IconMilk size={18} />,
  Limpieza: <IconSpray size={18} />,
  Abarrotes: <IconShoppingBag size={18} />,
};

interface Props {
  categorias: Categoria[];
  categoriaActiva: number;
  onSelect: (id: number) => void;
}

export const CategoriasSidebar = ({ categorias, categoriaActiva, onSelect }: Props) => (
  <aside className="flex flex-col w-40 min-h-screen bg-white border-r border-gray-200 px-2 py-4">
    <p className="btn-sans text-[10px] font-bold text-[#6b7280] tracking-widest px-2 mb-2">
      CATEGORÍAS
    </p>
    <nav className="flex flex-col gap-1 flex-1">
      {categorias.map((cat) => {
        const isActive = categoriaActiva === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg w-full text-left transition-all btn-sans text-sm font-medium cursor-pointer
              ${isActive ? "bg-[#FFD101] text-[#0a0a0a]" : "text-[#1a1a1a] hover:bg-gray-100"}`}
          >
            <span className={isActive ? "text-[#0a0a0a]" : "text-[#6b7280]"}>
              {iconMap[cat.nombre] ?? <IconQuestionMark size={18} />}
            </span>
            {cat.nombre}
          </button>
        );
      })}
    </nav>
    <div className="border-t border-gray-200 pt-3 flex flex-col gap-1">
      <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 btn-sans text-sm text-[#1a1a1a] cursor-pointer">
        <IconHelp size={18} className="text-[#6b7280]" /> Ayuda POS
      </button>
      <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 btn-sans text-sm text-[#B5000B] cursor-pointer">
        <IconDoorExit size={18} /> Cerrar Turno
      </button>
    </div>
  </aside>
);
