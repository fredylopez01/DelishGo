import { Product } from "./product";

export interface Category{
    id:number,
    name: string,
    photoUrl: string,
    products: Product[]
}