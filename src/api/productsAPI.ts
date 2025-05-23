import type { Product } from '../types/product';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const fetchAllProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error('Error fetching products');
  return res.json();
};

const fetchProductById = async (id: string): Promise<Product> => {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error('Error fetching product by ID');
  return res.json();
};

export { fetchAllProducts, fetchProductById };
