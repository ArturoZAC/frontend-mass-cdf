import { IconFilter, IconDownload } from "@tabler/icons-react";

export const KardexHeader = () => (
  <div className="flex items-start justify-between mb-6">
    <div>
      <h1 className="font-heading font-bold text-[#0a0a0a]" style={{ fontSize: 24 }}>
        Kardex de Movimientos
      </h1>
      <p className="p-muted mt-1">Gestión y control de flujo de mercadería en tiempo real.</p>
    </div>
    <div className="flex gap-2">
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors btn-sans text-sm font-medium text-[#1a1a1a]">
        <IconFilter size={16} />
        Filtrar
      </button>
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors btn-sans text-sm font-medium text-[#1a1a1a]">
        <IconDownload size={16} />
        Exportar
      </button>
    </div>
  </div>
);
