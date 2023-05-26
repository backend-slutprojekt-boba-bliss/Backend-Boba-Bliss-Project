import { createContext, useContext } from "react";
import { Customer } from "../components/CheckoutForm";
import { CartItem } from "../data";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { useCart } from "./CartContext";

type Order = {
  itemList: CartItem[];
  deliveryAddress: Customer;
};

type OrderContextType = {
  orderList: Order[];
  createOrder: (customer: Customer) => Order;
};

const OrderContext = createContext<OrderContextType>({
  orderList: [],
  createOrder: () => ({
    itemList: [],
    deliveryAddress: {
      firstName: "",
      lastName: "",
      street: "",
      city: "",
      zipCode: "",
    },
  })
});

export function useOrder() {
  return useContext(OrderContext);
}

type Props = {
  children: React.ReactNode;
};

export function OrderProvider({ children }: Props) {
  const { cartList, clearCart } = useCart();

  const [orderList, setOrderList] = useLocalStorageState<Order[]>(
    [],
    "orderList"
  );

  const createOrder = (customer: Customer) => {
    const itemList = cartList;
    const totalPrice = itemList.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);

    const deliveryAddress = customer;
    const newOrder = { itemList, deliveryAddress,  totalPrice };
    clearCart(cartList); // clear cart after creating order

    return newOrder;
  };


  const getLastOrder = (): {
    lastOrder: Order | undefined;
    ordersCopy: Order[];
  } => {
    const ordersCopy = [...orderList];
    const lastOrder = ordersCopy.pop();
    return { lastOrder, ordersCopy };
  };

  return (
    <OrderContext.Provider
      value={{ orderList, createOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
}
