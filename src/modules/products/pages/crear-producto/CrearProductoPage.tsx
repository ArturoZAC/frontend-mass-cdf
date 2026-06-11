import { useNavigate } from "react-router-dom";
import { ProductoForm } from "../../components/ProductoForm";
import { IconChevronLeft } from "@tabler/icons-react";
import { productsApi } from "../../api/products.api";
import type { ProductoFormData } from "../../schemas/producto.schema";

export const CrearProductoPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: ProductoFormData) => {
    const formData = new FormData();
    const { imagen, ...rest } = data;

    formData.append("data", new Blob([JSON.stringify(rest)], { type: "application/json" }));
    if (imagen) formData.append("imagen", imagen);

    await productsApi.create(formData);
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
            Agregar Producto
          </h3>
          <p className="p-muted text-sm mt-0.5">
            Completa los datos para registrar un nuevo producto.
          </p>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 p-6 max-w-3xl">
        <ProductoForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};
