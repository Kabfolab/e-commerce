import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api',
  headers: { 'Content-Type': 'application/json' }
});

export interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  image_url: string;
  created_at: string;
}

export const getProducts = () => api.get<Product[]>('/products/');
export const createProduct = (data: Omit<Product, 'id' | 'created_at'>) => api.post('/products/', data);
export const deleteProduct = (id: number) => api.delete(`/products/${id}/`);

export default api;
