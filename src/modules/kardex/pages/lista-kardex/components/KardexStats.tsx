import { IconArrowRight, IconArrowLeft, IconPackage, IconAlertTriangle } from "@tabler/icons-react";
import { TipoMovimiento, type MovimientoInventario } from "../mock/kardex.mock";

interface Props {
  movimientos: MovimientoInventario[];
}

export const KardexStats = ({ movimientos }: Props) => {
  const hoy = new Date().toDateString();
  const deHoy = movimientos.filter((m) => new Date(m.createdAt).toDateString() === hoy);
  const entradas = deHoy.filter((m) => m.tipoMovimiento === TipoMovimiento.ENTRADA).length;
  const salidas = deHoy.filter(
    (m) => m.tipoMovimiento === TipoMovimiento.SALIDA || m.tipoMovimiento === TipoMovimiento.VENTA,
  ).length;
  const skuActivos = new Set(movimientos.map((m) => m.producto.id)).size;
  const alertas = movimientos.filter((m) => m.tipoMovimiento === TipoMovimiento.AJUSTE).length;

  const stats = [
    {
      label: "Entradas (Hoy)",
      value: entradas,
      icon: <IconArrowRight size={22} color="#15803d" />,
      bg: "#dcfce7",
    },
    {
      label: "Salidas (Hoy)",
      value: salidas,
      icon: <IconArrowLeft size={22} color="#b91c1c" />,
      bg: "#fee2e2",
    },
    {
      label: "Total SKU Activos",
      value: skuActivos,
      icon: <IconPackage size={22} color="#1d4ed8" />,
      bg: "#dbeafe",
    },
    {
      label: "Alertas Stock",
      value: alertas,
      icon: <IconAlertTriangle size={22} color="#a16207" />,
      bg: "#fef9c3",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3"
        >
          <div
            className="flex items-center justify-center w-11 h-11 rounded-lg"
            style={{ backgroundColor: s.bg }}
          >
            {s.icon}
          </div>
          <div>
            <p className="small text-[#6b7280]">{s.label}</p>
            <p className="font-heading font-bold text-[#0a0a0a] text-xl">{s.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
