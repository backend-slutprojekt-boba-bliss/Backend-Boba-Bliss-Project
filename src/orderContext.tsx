import { createContext, useContext } from "react";
import { CartItem } from "../data";
import { useCart } from "./CartContext";
import { generateUniqueId } from "./components/AddProductForm";
import { Customer } from "./components/CheckoutForm";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

type Order = {
  itemList: CartItem[];
  contactInformation: Customer;
  orderId: string;
  totalPrice: number;
};

type OrderContextType = {
  orderList: Order[];
  addOrder: (order: Order) => void;
  createOrder: (customer: Customer) => Order;
  getLastOrder: () => { lastOrder: Order | undefined; ordersCopy: Order[] };
};

const OrderContext = createContext<OrderContextType>({
  orderList: [],
  createOrder: () => ({
    itemList: [],
    contactInformation: {
      name: "",
      email: "",
      phone: "",
      street: "",
      zipCode: "",
      city: "",
    },
    orderId: "",
    totalPrice: 0,
  }),
  addOrder: () => {},
  getLastOrder: () => ({ lastOrder: undefined, ordersCopy: [] }),
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

    const orderId = generateUniqueId();
    const contactInformation = customer;
    const newOrder = { itemList, contactInformation, orderId, totalPrice };
    addOrder(newOrder); // add new order to orderList
    clearCart(cartList); // clear cart after creating order

    return newOrder;
  };

  const addOrder = (order: Order) => {
    setOrderList((prevOrderList) => {
      const updatedOrderList = [...prevOrderList, order];
      return updatedOrderList;
    });
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
      value={{ orderList, createOrder, addOrder, getLastOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
}
