import { useEffect, useState, useRef } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconUpload, IconX } from "@tabler/icons-react";
import { productoSchema, type ProductoFormData } from "../schemas/producto.schema";
import {
  categoriasApi,
  proveedoresApi,
  type CategoriaResponse,
  type ProveedorResponse,
} from "../api/products.api";
import { getEnvs } from "../../../shared/helpers/get-envs";

type ProductoFormInput = {
  nombre: string;
  precio: number | string;
  stock: number | string;
  stockMinimo: number | string;
  idCategoria: number | string;
  idProveedor?: number | string;
  imagen?: File;
};

interface ProductoFormProps {
  defaultValues?: Partial<ProductoFormData>;
  defaultImagenUrl?: string;
  onSubmit: (data: ProductoFormData) => void;
  isEditing?: boolean;
}

const { BASE_URL_IMAGES } = getEnvs();

export const ProductoForm = ({
  defaultValues,
  defaultImagenUrl,
  onSubmit,
  isEditing = false,
}: ProductoFormProps) => {
  const [categorias, setCategorias] = useState<CategoriaResponse[]>([]);
  const [proveedores, setProveedores] = useState<ProveedorResponse[]>([]);
  const [preview, setPreview] = useState<string | null>(
    defaultImagenUrl ? `${BASE_URL_IMAGES}${defaultImagenUrl}` : null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   console.log({ defaultValues });
  // }, []);

  const {
    register,
    handleSubmit,
    setValue,
    // reset,
    formState: { errors },
  } = useForm<ProductoFormInput, unknown, ProductoFormData>({
    resolver: zodResolver(productoSchema) as Resolver<ProductoFormInput, unknown, ProductoFormData>,
    defaultValues: defaultValues ?? {},
  });

  // useEffect(() => {
  //   Promise.all([categoriasApi.getAll(), proveedoresApi.getAll()]).then(([catRes, provRes]) => {
  //     setCategorias(catRes.data);
  //     setProveedores(provRes.data);
  //     // if (defaultValues) reset(defaultValues);

  //     if (defaultValues)
  //       reset({
  //         ...defaultValues,
  //         idCategoria: defaultValues.idCategoria?.toString(),
  //         idProveedor: defaultValues.idProveedor?.toString(),
  //       });
  //   });
  // }, []);

  useEffect(() => {
    Promise.all([categoriasApi.getAll(), proveedoresApi.getAll()]).then(([catRes, provRes]) => {
      setCategorias(catRes.data);
      setProveedores(provRes.data);
      if (defaultValues) {
        setValue("nombre", defaultValues.nombre ?? "");
        setValue("precio", defaultValues.precio ?? 0);
        setValue("stock", defaultValues.stock ?? 0);
        setValue("stockMinimo", defaultValues.stockMinimo ?? 0);
        setValue("idCategoria", defaultValues.idCategoria?.toString() ?? "");
        setValue("idProveedor", defaultValues.idProveedor?.toString() ?? "");
      }
    });
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("imagen", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Nombre */}
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

      {/* Categoría + Proveedor */}
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
            {categorias.map((c) => (
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
            {proveedores.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Precio + Stock + Stock Mínimo */}
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

      {/* Imagen */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-[#1a1a1a]">Imagen del producto</label>
        <div
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-lg p-6 cursor-pointer hover:border-[#0D2DAA] transition-colors bg-gray-50"
        >
          {preview ? (
            <div className="relative">
              <img src={preview} alt="preview" className="w-32 h-32 object-cover rounded-lg" />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setPreview(null);
                  setValue("imagen", undefined);
                }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
              >
                <IconX size={12} color="white" />
              </button>
            </div>
          ) : (
            <>
              <IconUpload size={24} className="text-gray-400" />
              <p className="small text-[#6b7280]">Click para subir imagen</p>
              <p className="text-xs text-gray-400">PNG, JPG hasta 5MB</p>
            </>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
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
