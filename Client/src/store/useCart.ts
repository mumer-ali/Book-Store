import { create } from "zustand";

const getCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

const setCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const useCart = create((set, get) => ({
  cart: getCartFromLocalStorage(),
  addToCart: (item, quantity = 1) =>
    set((state) => {
      const updatedCart = [...state.cart, ...Array(quantity).fill(item)];
      setCartToLocalStorage(updatedCart);
      return { cart: updatedCart };
    }),
  removeFromCart: (itemId) =>
    set((state) => {
      const updatedCart = [...state.cart];
      const index = updatedCart.findIndex((item) => item.book_ID === itemId);
      if (index !== -1) {
        updatedCart.splice(index, 1);
      }
      setCartToLocalStorage(updatedCart);
      return { cart: updatedCart };
    }),
  getCount: (itemId) => {
    return get().cart.filter((item) => item.book_ID === itemId).length;
  },
  removeAll: (itemId) =>
    set((state) => {
      const updatedCart = state.cart.filter((item) => item.book_ID !== itemId);
      setCartToLocalStorage(updatedCart);
      return { cart: updatedCart };
    }),
  makeCartNull: () =>
    set(() => {
      setCartToLocalStorage([]);
      return { cart: [] };
    }),
}));

export default useCart;
