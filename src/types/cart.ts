export type CartItem = {
  productId: number;
  quantity: number;
};

export type CreateCartRequest = {
  userId: number;
  date?: string; // ISO
  products: CartItem[];
};

export type CreateCartResponse = {
  id: number;
  userId: number;
  date?: string;
  products: CartItem[];
};
