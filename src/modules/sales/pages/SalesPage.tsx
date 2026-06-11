import { useState } from "react";
import { categoriasMock, productosMock } from "../mock/sales.mock";
import { type CarritoItem, type Producto } from "../interfaces/sales.interfaces";
import { CategoriasSidebar } from "../components/CategoriasSidebar";
import { ProductosGrid } from "../components/ProductosGrid";
import { CarritoPanel } from "../components/CarritoPanel";

export const SalesPage = () => {
  const [categoriaActiva, setCategoriaActiva] = useState(1);
  const [carrito, setCarrito] = useState<CarritoItem[]>([]);

  const productosFiltrados =
    categoriaActiva === 1
      ? productosMock
      : productosMock.filter((p) => p.categoria.id === categoriaActiva);

  const agregar = (producto: Producto) => {
    setCarrito((prev) => {
      const existe = prev.find((i) => i.producto.id === producto.id);
      if (existe) {
        return prev.map((i) =>
          i.producto.id === producto.id
            ? { ...i, cantidad: i.cantidad + 1, subtotal: (i.cantidad + 1) * producto.precio }
            : i,
        );
      }
      return [...prev, { producto, cantidad: 1, subtotal: producto.precio }];
    });
  };

  const incrementar = (id: number) => {
    setCarrito((prev) =>
      prev.map((i) =>
        i.producto.id === id
          ? { ...i, cantidad: i.cantidad + 1, subtotal: (i.cantidad + 1) * i.producto.precio }
          : i,
      ),
    );
  };

  const decrementar = (id: number) => {
    setCarrito((prev) => {
      const item = prev.find((i) => i.producto.id === id);
      if (!item) return prev;
      if (item.cantidad === 1) return prev.filter((i) => i.producto.id !== id);
      return prev.map((i) =>
        i.producto.id === id
          ? { ...i, cantidad: i.cantidad - 1, subtotal: (i.cantidad - 1) * i.producto.precio }
          : i,
      );
    });
  };

  const eliminar = (id: number) => setCarrito((prev) => prev.filter((i) => i.producto.id !== id));

  const confirmar = (tipo: "ticket" | "boleta") => {
    console.log("Venta confirmada:", tipo, carrito);
    setCarrito([]);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <CategoriasSidebar
        categorias={categoriasMock}
        categoriaActiva={categoriaActiva}
        onSelect={setCategoriaActiva}
      />
      <ProductosGrid productos={productosFiltrados} onAgregar={agregar} />
      <CarritoPanel
        items={carrito}
        onIncrementar={incrementar}
        onDecrementar={decrementar}
        onEliminar={eliminar}
        onConfirmar={confirmar}
      />
    </div>
  );
};
