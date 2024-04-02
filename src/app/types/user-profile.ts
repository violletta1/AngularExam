import { Order } from "./orders";
import { Product } from "./products";

export interface ProfileUser{
    uid:string;
    email?:string;
    displayName?:string;
    photoURL?:string;
    firstName?:string;
    lastName?:string;
    phoneNumber?:string;
    address?:string;
    products?:Product[] | null
    orders?:Order[] | null;
}

