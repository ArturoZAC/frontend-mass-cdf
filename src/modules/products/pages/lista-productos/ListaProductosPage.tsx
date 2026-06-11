import { useState, useEffect } from "react";
import { productsApi, type ProductoResponse } from "../../api/products.api";
import { ProductsHeader } from "./components/ProductsHeader";
import { ProductsStats } from "./components/ProductsStats";
import { ProductsFilters } from "./components/ProductsFilters";
import { ProductsTable } from "./components/ProductsTable";
import { useNavigate } from "react-router-dom";

export const ListaProductosPage = () => {
  const [products, setProducts] = useState<ProductoResponse[]>([]);
  const [search, setSearch] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const navigate = useNavigate();

  useEffect(() => {
    productsApi.getAll().then((r) => setProducts(r.data));
  }, []);

  const filtered = products.filter((p) => {
    const matchSearch =
      p.nombre.toLowerCase().includes(search.toLowerCase()) ||
      p.codigo.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoria === "Todas" || p.categoria.nombre === categoria;
    return matchSearch && matchCat;
  });

  const handleAdd = () => navigate("/products/crear");
  const handleEdit = (p: ProductoResponse) => navigate(`/products/editar/${p.id}`);
  const handleDelete = async (p: ProductoResponse) => {
    await productsApi.delete(p.id);
    setProducts((prev) => prev.filter((x) => x.id !== p.id));
  };

  return (
    <div>
      <ProductsHeader onAdd={handleAdd} />
      <ProductsStats products={products} />
      <ProductsFilters onSearch={setSearch} onFilter={setCategoria} />
      <ProductsTable products={filtered} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};
