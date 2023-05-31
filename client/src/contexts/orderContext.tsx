import axios from "axios";
import { createContext, useContext, useState } from "react";
import { Customer } from "../components/CheckoutForm";
import { useCart } from "./CartContext";

type OrderContextType = {
  createOrder: (customer: Customer) => Promise<CreateOrderReturnType>;
  orderId: null | string;
};
export type CreateOrderReturnType = {
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

export const OrderContext = createContext<OrderContextType>({
  createOrder: ((customer: Customer) => {}) as any,
  orderId: null,
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

  const createOrder = async (customer: Customer) => {
    const itemList = cartList.map((item) => ({
      _id: item._id,
      quantity: item.quantity,
    }));

    const deliveryAddress = {
      firstName: customer.firstName,
      lastName: customer.lastName,
      street: customer.street,
      zipCode: customer.zipCode,
      city: customer.city,
    };

    const newOrder = { products: itemList, deliveryAddress };

    const response = await axios.post("/api/orders", newOrder, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Order created:", response.data);
    setOrderId(response.data._id);
    clearCart(cartList);
    return response.data;
  };

  return (
    <OrderContext.Provider value={{ orderId, createOrder }}>
      {children}
    </OrderContext.Provider>
  );
}
