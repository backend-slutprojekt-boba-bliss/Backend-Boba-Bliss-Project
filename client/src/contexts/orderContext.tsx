import axios from "axios";
import { createContext, useContext, useState } from "react";
import { Customer } from "../components/CheckoutForm";
import { CartItem } from "../data";
import { useCart } from "./CartContext";

type Order = {
  itemList: CartItem[];
  deliveryAddress: Customer;
};

type OrderContextType = {

  createOrder: (customer: Customer) => Promise<CreateOrderReturnType>;
  orderId: null, // Initialize orderId to null
};
type CreateOrderReturnType = {
  _id: string;
  products: {
    image: string;
    imageAlt: string;
    title: string;
    description: string;
    price: number;
    bgColor: string;
    quantity: number;
    inStock: number;
  }[];
  categories: string[];
  user: string;
  deliveryAddress: {
    firstName: string;
    lastName: string;
    street: string;
    zipCode: string;
    city: string;
  };
  createdAt: string;
  isSent: boolean;
  __v: number;
};



const OrderContext = createContext<OrderContextType>({
  createOrder: ((customer:Customer) => {}) as any,
  orderId: null, // Initialize orderId to null
});

export function useOrder() {
  return useContext(OrderContext);
}

type Props = {
  children: React.ReactNode;
};

export function OrderProvider({ children }: Props) {
  const { cartList, clearCart } = useCart();
  const [orderId, setOrderId] = useState<string | null>(null); 


  const createOrder = async (customer:Customer) => {
    const itemList = cartList.map(item => ({ _id: item._id, quantity: item.quantity }));
  
    const deliveryAddress = {
      firstName: customer.firstName,
      lastName: customer.lastName,
      street: customer.street,
      zipCode: customer.zipCode,
      city: customer.city
    };
  
    const newOrder = { products: itemList, deliveryAddress };
  
    
      const response = await axios.post('/api/orders', newOrder, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        
          console.log('Order created:', response.data);
          clearCart(cartList); // Clear cart after creating order
      return response.data
    
    }
  


 

  return (
    <OrderContext.Provider
      value={{orderId, createOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
}
