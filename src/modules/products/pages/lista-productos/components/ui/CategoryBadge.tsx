const categoryColors: Record<string, string> = {
  Abarrotes: "bg-red-100 text-red-700",
  Lácteos: "bg-blue-100 text-blue-700",
  Limpieza: "bg-green-100 text-green-700",
  Bebidas: "bg-purple-100 text-purple-700",
  Conservas: "bg-orange-100 text-orange-700",
};

interface CategoryBadgeProps {
  categoria: string;
}

export const CategoryBadge = ({ categoria }: CategoryBadgeProps) => {
  const color = categoryColors[categoria] ?? "bg-gray-100 text-gray-700";
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${color} mx-auto`}>
      {categoria}
    </span>
  );
};
