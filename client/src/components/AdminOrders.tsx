import { CloseIcon } from "@chakra-ui/icons";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  IconButton,
  ListIcon,
  ListItem,
  SystemStyleObject,
  Text,
  UnorderedList,
  useBreakpointValue,
  Image,
} from "@chakra-ui/react";
import axios from "axios";
import { MdCheckCircle } from "react-icons/md";
import { Product } from "../data";
import { Customer } from "./CheckoutForm";
import { useState, useEffect } from "react";
import { TbBorderRadius } from "react-icons/tb";

export interface OrderData {
  _id: string;
  products: Product[];
  user: string;
  deliveryAddress: Customer;
  createdAt: Date;
  isSent: boolean;
}

export function AdminOrders() {
  const [orderList, setOrderList] = useState<OrderData[]>([]);

  useEffect(() => {
    axios
      .get("/api/orders")
      .then((res) => {
        setOrderList(res.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const cardBodyFontSize = useBreakpointValue({ base: "1rem", sm: "1.2rem" });

  const handleCloseOrders = () => {
    window.history.back(); // Redirect back to the previous page
  };

  return (
    <Flex
      gap={[2, 2, 3, 4]}
      my={1}
      direction="row"
      wrap={"wrap"}
      width={["100%", "100%", "100%", "70%"]}
    >
      <Card width={"100%"}>
        <IconButton
          aria-label="Close See orders"
          icon={<CloseIcon />}
          onClick={handleCloseOrders}
        />

        <CardHeader p="5px">
          <Text as="h2">Orders</Text>
        </CardHeader>
        <CardBody fontSize={cardBodyFontSize} width="100%" p="0">
          <UnorderedList listStyleType="none" marginInlineStart="0">
            {orderList.map((order) => (
              <ListItem key={order._id} py="1rem" border="2px solid #E2E8F0">
                <Text fontSize="10px">
                  <span>
                    <strong>Order ID:</strong> {order._id}
                  </span>
                  <br />
                  <span>
                    <strong>Customer:</strong>{" "}
                    {`${order.deliveryAddress.firstName} ${order.deliveryAddress.lastName}`}
                  </span>
                  <br />
                  <span>
                    <strong>Address:</strong>{" "}
                    {`${order.deliveryAddress.city}, ${order.deliveryAddress.zipCode}`}
                  </span>
                  <br />
                  <span>
                    <strong>Created:</strong>{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                  <br />
                  <strong>Products:</strong>
                  <UnorderedList  listStyleType="none">
                    {order.products.map((product) => (
                      <ListItem
                        key={product._id}
                        display="flex"
                        alignItems="center"
                      >
                        {" "}
                        <Image
                          sx={thumbNailStyle}
                          src={"/api/file/" + product.image}
                        ></Image>
                        <Text>{product.title}</Text>
                        <ListItem marginLeft={"1rem"}>Quantity: {product.quantity}</ListItem>
                      </ListItem>
                    ))}
                  </UnorderedList>
                </Text>
              </ListItem>
            ))}
          </UnorderedList>
        </CardBody>
      </Card>
    </Flex>
  );
}

const flexStyle: SystemStyleObject = {
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  rowGap: "1.25rem",
  textAlign: "center",
};

// Custom style for box component

const thumbNailStyle = {
  width: "2rem",
  borderRadius: "50%",
  marginRight: "1rem"
};
