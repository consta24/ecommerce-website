import { Product } from './Product';

export interface CartResponse {
  cartItems: CartItem[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface AddToCartRequest {
  username: string;
  product: Product;
}
