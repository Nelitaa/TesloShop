import type { CartProduct } from '@/interfaces';
import { create } from 'zustand';

interface State {
  cart: CartProduct[];
  // addProductToCart
  // removeProduct
  // updateProductQuantity
}

export const useCartStore = create<State>()(
  (set) => ({
    cart: [],
  })
);