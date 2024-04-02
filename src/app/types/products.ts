import { User } from "@angular/fire/auth";
import { ProfileUser } from "./user-profile";

export interface Product {
    uid: string;
    name: string;
    description: string;
    price: number;
    category: string[];
    img: string;
    userId: string; 
}
