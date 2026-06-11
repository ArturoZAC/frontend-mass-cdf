import { useNavigate } from "react-router-dom";
import { ProductoForm } from "../../components/ProductoForm";
import { IconChevronLeft } from "@tabler/icons-react";
import type { ProductoFormData } from "../../schemas/producto.schema";

export const CrearProductoPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (data: ProductoFormData) => {
    console.log("Crear producto:", data);
    navigate("/products");
  };

  return (
    <div>
      {/* Header */}
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

      {/* Form Card */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 max-w-3xl">
        <ProductoForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};
