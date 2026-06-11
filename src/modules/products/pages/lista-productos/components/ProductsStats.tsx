import type { ProductoResponse } from "../../../api/products.api";

interface Props {
  products: ProductoResponse[];
}

export const ProductsStats = ({ products }: Props) => {
  const total = products.length;
  const enStock = products.filter((p) => p.stock > p.stockMinimo * 2).length;
  const stockBajo = products.filter(
    (p) => p.stock > p.stockMinimo && p.stock <= p.stockMinimo * 2,
  ).length;
  const agotado = products.filter((p) => p.stock <= p.stockMinimo).length;

  const stats = [
    { label: "TOTAL PRODUCTOS", value: total.toLocaleString(), color: "text-[#1a1a1a]" },
    { label: "EN STOCK", value: enStock.toLocaleString(), color: "text-green-600" },
    { label: "STOCK BAJO", value: stockBajo.toLocaleString(), color: "text-yellow-500" },
    { label: "AGOTADO", value: agotado.toLocaleString(), color: "text-red-600" },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white rounded-xl p-4 border border-gray-100">
          <p className="h1-badge text-[10px] text-gray-400 mb-1">{stat.label}</p>
          <p
            className={`text-3xl font-black ${stat.color}`}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
};
