export interface Product {
  _id: string;
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  price: number;
  bgColor: string;
  quantity?: number;
  inStock?: number;
  categories: string[];
}

export interface CartItem extends Product {
  quantity: number;
}
