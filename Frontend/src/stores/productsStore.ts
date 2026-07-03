import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { seedProducts } from './seedData';

export interface Product {
  id: string;
  sku: string;
  name: string;
  priceCents: number;
  stockQuantity: number;
  description?: string;
  createdAt: string;
}

export type ProductInput = Omit<Product, 'id' | 'createdAt'>;

interface ProductsState {
  products: Product[];
  addProduct: (input: ProductInput) => Product;
  updateProduct: (id: string, input: ProductInput) => void;
  removeProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
}

export const useProductsStore = create<ProductsState>()(
  persist(
    (set, get) => ({
      products: seedProducts,
      addProduct: (input) => {
        const product: Product = {
          ...input,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString()
        };
        set((state) => ({ products: [product, ...state.products] }));
        return product;
      },
      updateProduct: (id, input) => {
        set((state) => ({
          products: state.products.map((product) => (product.id === id ? { ...product, ...input } : product))
        }));
      },
      removeProduct: (id) => {
        set((state) => ({ products: state.products.filter((product) => product.id !== id) }));
      },
      getProduct: (id) => get().products.find((product) => product.id === id)
    }),
    { name: 'eoms-products-v2' }
  )
);
