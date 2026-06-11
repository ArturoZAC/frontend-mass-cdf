import type { MovimientoInventario } from "../mock/kardex.mock";
import { TipoBadge } from "./ui/TipoBadge";

interface Props {
  movimientos: MovimientoInventario[];
  page: number;
  perPage: number;
  onPageChange: (p: number) => void;
}

export const KardexTable = ({ movimientos, page, perPage, onPageChange }: Props) => {
  const total = movimientos.length;
  const totalPages = Math.ceil(total / perPage);
  const slice = movimientos.slice((page - 1) * perPage, page * perPage);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString("es-PE", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const getInitials = (nombre: string, apellido: string) =>
    `${nombre[0]}${apellido[0]}`.toUpperCase();

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <h2 className="font-heading font-semibold text-[#0a0a0a]" style={{ fontSize: 18 }}>
          Historial de Operaciones
        </h2>
        <div className="flex items-center gap-3 text-xs text-[#6b7280] btn-sans">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block" /> Entrada
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> Salida
          </span>
        </div>
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-100">
            {["FECHA & HORA", "PRODUCTO", "TIPO", "CANTIDAD", "RESPONSABLE", "ACCIONES"].map(
              (h) => (
                <th
                  key={h}
                  className="px-6 py-3 text-left btn-sans text-xs font-semibold text-[#6b7280] tracking-wide"
                >
                  {h}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {slice.map((m, i) => (
            <tr key={m.id} className={i % 2 === 0 ? "bg-white" : "bg-[#f9fafb]"}>
              <td className="px-6 py-4 small text-[#6b7280]">{formatDate(m.createdAt)}</td>
              <td className="px-6 py-4">
                <span className="btn-sans text-sm font-medium" style={{ color: "#B5000B" }}>
                  {m.producto.nombre}
                </span>
              </td>
              <td className="px-6 py-4">
                <TipoBadge tipo={m.tipoMovimiento} />
              </td>
              <td className="px-6 py-4">
                <span
                  className={`btn-sans font-semibold text-sm ${
                    m.tipoMovimiento === "ENTRADA" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {m.tipoMovimiento === "ENTRADA" ? "+" : "-"}
                  {m.cantidad}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0D2DAA] text-white btn-sans text-xs font-bold">
                    {getInitials(m.empleado.nombre, m.empleado.apellido)}
                  </div>
                  <span className="small text-[#1a1a1a]">
                    {m.empleado.nombre} {m.empleado.apellido}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4">
                <button className="small text-[#0D2DAA] hover:underline btn-sans">Ver</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
        <span className="small text-[#6b7280]">
          Mostrando {slice.length} de {total} movimientos
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-sm hover:bg-gray-50 disabled:opacity-40"
          >
            ‹
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`w-8 h-8 rounded-lg border text-sm btn-sans font-medium ${
                p === page
                  ? "bg-[#B5000B] text-white border-[#B5000B]"
                  : "border-gray-200 hover:bg-gray-50 text-[#1a1a1a]"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-sm hover:bg-gray-50 disabled:opacity-40"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
};
