import { TipoMovimiento } from "../../mock/kardex.mock";

const config: Record<TipoMovimiento, { label: string; bg: string; color: string }> = {
  [TipoMovimiento.ENTRADA]: { label: "ENTRADA", bg: "#dcfce7", color: "#15803d" },
  [TipoMovimiento.SALIDA]: { label: "SALIDA", bg: "#fee2e2", color: "#b91c1c" },
  [TipoMovimiento.AJUSTE]: { label: "AJUSTE", bg: "#fef9c3", color: "#a16207" },
  [TipoMovimiento.VENTA]: { label: "VENTA", bg: "#ede9fe", color: "#6d28d9" },
};

export const TipoBadge = ({ tipo }: { tipo: TipoMovimiento }) => {
  const { label, bg, color } = config[tipo];
  return (
    <span
      className="btn-sans text-xs font-semibold px-3 py-1 rounded-full"
      style={{ backgroundColor: bg, color }}
    >
      {label}
    </span>
  );
};
