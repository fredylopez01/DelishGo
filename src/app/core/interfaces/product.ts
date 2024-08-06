export interface Product{
    id: number,
    name: string,
    price: number,
    isVegan: boolean,
    isCeliac: boolean,
    photoUrl: string,
    ingredients: string[]
}