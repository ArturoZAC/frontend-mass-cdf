import { api } from "../../../shared/api/axios.instance";

export interface ProductoResponse {
  id: number;
  codigo: string;
  nombre: string;
  precio: number;
  stock: number;
  stockMinimo: number;
  imagenUrl?: string;
  updatedAt: string;
  categoria: { id: number; nombre: string };
  proveedor?: { id: number; nombre: string };
}

export interface CategoriaResponse {
  id: number;
  nombre: string;
}

export interface ProveedorResponse {
  id: number;
  nombre: string;
}

export const productsApi = {
  getAll: () => api.get<ProductoResponse[]>("/products"),
  getById: (id: number) => api.get<ProductoResponse>(`/products/${id}`),
  create: (formData: FormData) =>
    api.post<ProductoResponse>("/products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  update: (id: number, formData: FormData) =>
    api.put<ProductoResponse>(`/products/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  delete: (id: number) => api.delete(`/products/${id}`),
};

export const categoriasApi = {
  getAll: () => api.get<CategoriaResponse[]>("/categorias"),
};

export const proveedoresApi = {
  getAll: () => api.get<ProveedorResponse[]>("/proveedores"),
};
