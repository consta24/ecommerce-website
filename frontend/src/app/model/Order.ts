import { Product } from './Product';

export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface Order {
  orderNumber: string;
  date: string;
  username: string;
  orderItems: OrderItem[];
}
