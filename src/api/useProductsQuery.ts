import { useQuery } from '@tanstack/react-query';
import { fetchAllProducts } from '@/api/productsAPI';
import type { Product } from '@/types/product';

export function useProductsQuery() {
  return useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: fetchAllProducts,
    staleTime: 1000 * 60 * 5,
  });
}
