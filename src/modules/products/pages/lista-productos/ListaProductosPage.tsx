import { useState } from "react";
import { productsMock, type Product } from "./mock/products.mock";
import { ProductsHeader } from "./components/ProductsHeader";
import { ProductsStats } from "./components/ProductsStats";
import { ProductsFilters } from "./components/ProductsFilters";
import { ProductsTable } from "./components/ProductsTable";
import { useNavigate } from "react-router-dom";

export const ListaProductosPage = () => {
  const [search, setSearch] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const navigate = useNavigate();

  const filtered = productsMock.filter((p) => {
    const matchSearch =
      p.nombre.toLowerCase().includes(search.toLowerCase()) ||
      p.codigo.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoria === "Todas" || p.categoria.nombre === categoria;
    return matchSearch && matchCat;
  });

  // const handleAdd = () => console.log("Agregar producto");
  // const handleEdit = (p: Product) => console.log("Editar", p);
  const handleAdd = () => navigate("/products/crear");
  const handleEdit = (p: Product) => navigate(`/products/editar/${p.id}`);
  const handleDelete = (p: Product) => console.log("Eliminar", p);

  return (
    <div>
      <ProductsHeader onAdd={handleAdd} />
      <ProductsStats />
      <ProductsFilters onSearch={setSearch} onFilter={setCategoria} />
      <ProductsTable products={filtered} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};
