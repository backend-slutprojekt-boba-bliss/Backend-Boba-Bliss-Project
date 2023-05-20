export interface Product {
  id: string;
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  price: number;
  bgColor: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

// /images/yellowboba.png"
// /images/pinkboba.png"
// /images/greenboba.png"

export const products: Product[] = [
  {
    id: "1",
    image: "/images/productImages/brown-sugar-tea.png",
    imageAlt: "boba",
    title: "Brown sugar Milk",
    description:
      "Fresh milk with decadent brown sugar syrup and tapioca pearls.",
    price: 6.5,
    bgColor: "yellowCardCircle",
    category: "milk",
  },
  {
    id: "2",
    image: "/images/productImages/taro-purple.png",
    imageAlt: "boba",
    title: "Taro Milk Tea",
    description:
      "Sweet taro root (it tastes like cookies!) with milk, jasmine tea and tapioca.",
    price: 6.5,

    bgColor: "#bf96da",
    category: "milk",
  },
  {
    id: "3",
    image: "/images/productImages/vanilla-tea.png",
    imageAlt: "boba",
    title: "Milk Tea",
    description: "Classic milk tea made from black tea, served with tapioca.",
    price: 6.5,

    bgColor: "yellowCardCircle",
    category: "milk",
  },
  {
    id: "4",
    image: "/images/productImages/matcha-tea-1.png",
    imageAlt: "boba",
    title: "Matcha Milk Tea",
    description: "A fan favorite made with green tea, oat milk and tapioca.",
    price: 6.5,

    bgColor: "bigMatchaCard",
    category: "milk",
  },
  {
    id: "5",
    image: "/images/productImages/thai-tea.png",
    imageAlt: "boba",
    title: "Thai Iced Tea",
    description:
      "Sugar spice and everything nice! Made with black tea, spices and sweetened condensed milk.",
    price: 6.5,

    bgColor: "yellowCardCircle",
    category: "milk",
  },
  {
    id: "6",
    image: "/images/productImages/peach-fruit-tea.png",
    imageAlt: "boba",
    title: "Peach Fruit Tea",
    description:
      "A classic iced tea made with green tea and served with coco jelly, perfect for summer days.",
    price: 6.0,
    bgColor: "fruitTeaCircle",
    category: "fruit",
  },
  {
    id: "7",
    image: "/images/productImages/passion.png",
    imageAlt: "boba",
    title: "Passion Fruit Tea",
    description:
      "We've got passion for passion! This black tea with coco jelly quenches any thirst.",
    price: 6.0,
    bgColor: "yellowCardCircle",
    category: "fruit",
  },
  {
    id: "8",
    image: "/images/productImages/strawberry-drink.png",
    imageAlt: "boba",
    title: "Strawberry Fruit Tea",
    description: "Description of the drink!",
    price: 6.0,
    bgColor: "fruitTeaCircle",
    category: "fruit",
  },
  {
    id: "9",
    image: "/images/productImages/blueberry-clear-tea.png",
    imageAlt: "boba",
    title: "Blueberry Fruit Tea",
    description: "Green tea with blue balls.",
    price: 6.0,
    bgColor: "#8fc2e9",
    category: "fruit",
  },
  {
    id: "10",
    image: "/images/productImages/oolong.png",
    imageAlt: "boba",
    title: "Oolong Tea",
    description: "A hybrid of green and black tea, served with tapioca.",
    price: 6.0,
    bgColor: "bigMatchaCard",
    category: "milk",
  },
];
