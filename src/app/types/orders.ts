import { Product } from "./products";
import { ProfileUser } from "./user-profile";

export interface OrderItem {
    productId: Product;
    quantity: number;
    price: number; 
}

export interface Order {
    id: string;
    userId: ProfileUser;
    orderItems: OrderItem[];
    totalPrice: number;
}