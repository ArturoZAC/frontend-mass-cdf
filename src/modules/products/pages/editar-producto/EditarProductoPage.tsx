import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductoForm } from "../../components/ProductoForm";
import { IconChevronLeft } from "@tabler/icons-react";
import { productsApi, type ProductoResponse } from "../../api/products.api";
import type { ProductoFormData } from "../../schemas/producto.schema";

export const EditarProductoPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [producto, setProducto] = useState<ProductoResponse | null>(null);

  useEffect(() => {
    if (id) productsApi.getById(Number(id)).then((r) => setProducto(r.data));
  }, [id]);

  if (!producto)
    return (
      <div className="flex items-center justify-center h-64">
        <p className="p-muted text-sm">Cargando producto...</p>
      </div>
    );

  const defaultValues: Partial<ProductoFormData> = {
    nombre: producto.nombre,
    precio: producto.precio,
    stock: producto.stock,
    stockMinimo: producto.stockMinimo,
    idCategoria: producto.categoria.id,
    idProveedor: producto.proveedor?.id,
  };

  const handleSubmit = async (data: ProductoFormData) => {
    const formData = new FormData();
    const { imagen, ...rest } = data;

    formData.append("data", new Blob([JSON.stringify(rest)], { type: "application/json" }));
    if (imagen) formData.append("imagen", imagen);

    await productsApi.update(Number(id), formData);
    navigate("/products");
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate("/products")}
          className="p-2 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
        >
          <IconChevronLeft size={20} className="text-gray-600" />
        </button>
        <div>
          <h3 className="font-black" style={{ fontFamily: "var(--font-heading)" }}>
            Editar Producto
          </h3>
          <p className="p-muted text-sm mt-0.5">
            Modifica los datos del producto{" "}
            <span className="font-semibold text-[#1a1a1a]">{producto.nombre}</span>
          </p>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 p-6 max-w-3xl">
        <ProductoForm
          defaultValues={defaultValues}
          defaultImagenUrl={producto.imagenUrl}
          onSubmit={handleSubmit}
          isEditing
        />
      </div>
    </div>
  );
};
