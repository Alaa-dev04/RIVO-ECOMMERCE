// data/products.ts

export interface Product {
  id: number;
  brand: string;
  title: string;
  image: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  isFavorite: boolean;
  stock: number;
}

export const products: Product[] = [
  {
    id: 1,
    brand: "Apple",
    title: "Apple iPhone 15 Pro Max 256GB Natural Titanium",
    image: "/phone1.png",
    price: 4299,
    oldPrice: 4999,
    rating: 5,
    reviewCount: 1124,
    isFavorite: true,
    stock: 15,
  },
  {
    id: 2,
    brand: "Samsung",
    title: "Samsung Galaxy S23 Ultra 512GB Phantom Black",
    image: "/phone2.png",
    price: 4100,
    oldPrice: 4799,
    rating: 4,
    reviewCount: 4201,
    isFavorite: false,
    stock: 9,
  },
  {
    id: 3,
    brand: "Google",
    title: "Google Pixel 8 Pro 256GB Obsidian",
    image: "/phone3.png",
    price: 3799,
    oldPrice: 4209,
    rating: 4,
    reviewCount: 1161,
    isFavorite: false,
    stock: 7,
  },
  {
    id: 4,
    brand: "OnePlus",
    title: "OnePlus 11 128GB+256GB Titan Black",
    image: "/phone4.png",
    price: 2899,
    oldPrice: 3209,
    rating: 4,
    reviewCount: 1532,
    isFavorite: false,
    stock: 20,
  },
];