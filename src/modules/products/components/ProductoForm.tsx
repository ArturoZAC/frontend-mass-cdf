import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productoSchema, type ProductoFormData } from "../schemas/producto.schema";

const categoriasMock = [
  { id: 1, nombre: "Abarrotes" },
  { id: 2, nombre: "Lácteos" },
  { id: 3, nombre: "Limpieza" },
  { id: 4, nombre: "Bebidas" },
  { id: 5, nombre: "Conservas" },
];

const proveedoresMock = [
  { id: 1, nombre: "Distribuidora Lima" },
  { id: 2, nombre: "Gloria S.A." },
  { id: 3, nombre: "Arca Continental" },
];

type ProductoFormInput = {
  nombre: string;
  codigo: string;
  precio: number | string;
  stock: number | string;
  stockMinimo: number | string;
  idCategoria: number | string;
  idProveedor?: number | string;
  imagen?: string;
};

interface ProductoFormProps {
  defaultValues?: Partial<ProductoFormData>;
  onSubmit: (data: ProductoFormData) => void;
  isEditing?: boolean;
}

export const ProductoForm = ({ defaultValues, onSubmit, isEditing = false }: ProductoFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductoFormInput, unknown, ProductoFormData>({
    resolver: zodResolver(productoSchema) as Resolver<ProductoFormInput, unknown, ProductoFormData>,
    defaultValues: defaultValues ?? {},
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Fila 1 — Nombre + Código */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-[#1a1a1a]">
            Nombre del producto <span className="text-red-500">*</span>
          </label>
          <input
            {...register("nombre")}
            placeholder="Ej: Aceite Vegetal 1L"
            className={`px-3 py-2.5 rounded-lg border text-sm outline-none transition-colors
              ${errors.nombre ? "border-red-400 bg-red-50" : "border-gray-200 bg-white focus:border-[#0D2DAA]"}`}
          />
          {errors.nombre && <span className="text-xs text-red-500">{errors.nombre.message}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-[#1a1a1a]">
            Código SKU <span className="text-red-500">*</span>
          </label>
          <input
            {...register("codigo")}
            placeholder="Ej: AV-102934-M"
            className={`px-3 py-2.5 rounded-lg border text-sm outline-none transition-colors font-mono
              ${errors.codigo ? "border-red-400 bg-red-50" : "border-gray-200 bg-white focus:border-[#0D2DAA]"}`}
          />
          {errors.codigo && <span className="text-xs text-red-500">{errors.codigo.message}</span>}
        </div>
      </div>

      {/* Fila 2 — Categoría + Proveedor */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-[#1a1a1a]">
            Categoría <span className="text-red-500">*</span>
          </label>
          <select
            {...register("idCategoria")}
            className={`px-3 py-2.5 rounded-lg border text-sm outline-none transition-colors bg-white
              ${errors.idCategoria ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-[#0D2DAA]"}`}
          >
            <option value="">Selecciona una categoría</option>
            {categoriasMock.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
          {errors.idCategoria && (
            <span className="text-xs text-red-500">{errors.idCategoria.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-[#1a1a1a]">Proveedor</label>
          <select
            {...register("idProveedor")}
            className="px-3 py-2.5 rounded-lg border border-gray-200 text-sm outline-none bg-white focus:border-[#0D2DAA] transition-colors"
          >
            <option value="">Sin proveedor</option>
            {proveedoresMock.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Fila 3 — Precio + Stock + Stock Mínimo */}
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-[#1a1a1a]">
            Precio (S/.) <span className="text-red-500">*</span>
          </label>
          <input
            {...register("precio")}
            type="number"
            step="0.01"
            placeholder="0.00"
            className={`px-3 py-2.5 rounded-lg border text-sm outline-none transition-colors
              ${errors.precio ? "border-red-400 bg-red-50" : "border-gray-200 bg-white focus:border-[#0D2DAA]"}`}
          />
          {errors.precio && <span className="text-xs text-red-500">{errors.precio.message}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-[#1a1a1a]">
            Stock inicial <span className="text-red-500">*</span>
          </label>
          <input
            {...register("stock")}
            type="number"
            placeholder="0"
            className={`px-3 py-2.5 rounded-lg border text-sm outline-none transition-colors
              ${errors.stock ? "border-red-400 bg-red-50" : "border-gray-200 bg-white focus:border-[#0D2DAA]"}`}
          />
          {errors.stock && <span className="text-xs text-red-500">{errors.stock.message}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-[#1a1a1a]">Stock mínimo</label>
          <input
            {...register("stockMinimo")}
            type="number"
            placeholder="0"
            className="px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-sm outline-none focus:border-[#0D2DAA] transition-colors"
          />
        </div>
      </div>

      {/* Fila 4 — Imagen URL */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-[#1a1a1a]">URL de imagen</label>
        <input
          {...register("imagen")}
          placeholder="https://..."
          className="px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-sm outline-none focus:border-[#0D2DAA] transition-colors"
        />
      </div>

      {/* Submit */}
      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-5 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-5 py-2.5 rounded-lg bg-[#FFD101] hover:bg-[#e6bc00] text-sm font-bold text-[#1a1a1a] transition-colors cursor-pointer"
        >
          {isEditing ? "Guardar cambios" : "Crear producto"}
        </button>
      </div>
    </form>
  );
};
