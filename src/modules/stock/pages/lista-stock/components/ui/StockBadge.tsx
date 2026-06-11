import type { EstadoStock } from "../../mock/stock.mock";

interface Props {
  estado: EstadoStock;
}

const config: Record<EstadoStock, { label: string; className: string }> = {
  OPTIMO: {
    label: "EN STOCK",
    className: "bg-green-100 text-green-700",
  },
  STOCK_BAJO: {
    label: "STOCK BAJO",
    className: "bg-orange-100 text-orange-600",
  },
  AGOTADO: {
    label: "AGOTADO",
    className: "bg-red-100 text-red-600",
  },
};

export const StockBadge = ({ estado }: Props) => {
  const { label, className } = config[estado];
  return <span className={`h1-badge px-2 py-0.5 rounded-full ${className}`}>{label}</span>;
};
