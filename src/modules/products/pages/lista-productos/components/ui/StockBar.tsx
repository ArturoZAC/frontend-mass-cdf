interface StockBarProps {
  stock: number;
  stockMinimo: number;
}

export const StockBar = ({ stock, stockMinimo }: StockBarProps) => {
  const ratio = stock / (stockMinimo * 2);
  const percent = Math.min(ratio * 100, 100);

  let color = "bg-green-500";
  if (stock < stockMinimo) color = "bg-red-500";
  else if (stock === stockMinimo) color = "bg-yellow-400";

  return (
    <div className="flex items-center gap-2 mx-auto">
      <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${percent}%` }} />
      </div>
      <span
        className={`text-xs font-bold ${
          stock < stockMinimo
            ? "text-red-500"
            : stock === stockMinimo
              ? "text-yellow-500"
              : "text-green-600"
        }`}
      >
        {stock} UN
      </span>
    </div>
  );
};
