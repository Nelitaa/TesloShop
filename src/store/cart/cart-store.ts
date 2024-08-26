import type { CartProduct } from '@/interfaces';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  cart: CartProduct[];
  getTotalItems: () => number;
  getSummaryInformation: () => {
    totalItems: number;
    totalPrice: number;
    tax: number;
    subTotalPrice: number;
  }
  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;
  clearCart: () => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },

      getSummaryInformation: () => {
        const { cart } = get();
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        const subTotalPrice = cart.reduce((subTotal, product) => subTotal + (product.price * product.quantity), 0);
        const tax = subTotalPrice * 0.15;
        const totalPrice = subTotalPrice + tax;
        return { totalItems, totalPrice, tax, subTotalPrice };
      },

      addProductToCart: (product: CartProduct) => {
        const { cart } = get();
        // Check if the product is already in the cart
        const productInCart = cart.some(
          (item) => (item.id === product.id && item.size === product.size)
        );
        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }
        // Update the quantity of the product in the cart
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity };
          }
          return item;
        });
        set({ cart: updatedCartProducts });
      },

      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: quantity };
          }
          return item;
        });
        set({ cart: updatedCartProducts });
      },

      removeProduct: (product: CartProduct) => {
        const { cart } = get();
        const updatedCartProducts = cart.filter(
          (item) => !(item.id === product.id && item.size === product.size)
        );
        set({ cart: updatedCartProducts });
      },
      clearCart: () => {
        set({ cart: [] })
      }
    })
    , {
      name: 'shopping-cart'
    }
  )
);