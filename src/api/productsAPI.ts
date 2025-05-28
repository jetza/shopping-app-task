import type { Product } from '../types/product';
import { PRODUCT_API_URL } from '@/constants/urls';

const fetchAllProducts = async (): Promise<Product[]> => {
  const res = await fetch(PRODUCT_API_URL);
  if (!res.ok) throw new Error('Error fetching products');
  return res.json();
};

const fetchProductById = async (id: string): Promise<Product> => {
  const res = await fetch(`${PRODUCT_API_URL}/${id}`);
  if (!res.ok) throw new Error('Error fetching product by ID');
  return res.json();
};

export { fetchAllProducts, fetchProductById };

export const fetchProducts = async () => {
  const response = await fetch(PRODUCT_API_URL);
  return response.json();
};
