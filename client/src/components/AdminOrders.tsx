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
} from "@chakra-ui/react";
import axios from "axios";
import { MdCheckCircle } from "react-icons/md";
import { Product } from "../data";
import { Customer } from "./CheckoutForm";
import { useState, useEffect } from "react";

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
		<Card sx={cartStyle}>
			<Flex sx={flexStyle}>
				<IconButton
					aria-label="Close See orders"
					icon={<CloseIcon />}
					onClick={handleCloseOrders}
				/>

				<CardHeader p="5px">
					<Text as="h2">Orders</Text>
				</CardHeader>
				<CardBody fontSize={cardBodyFontSize} width="50%" p="0">
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
									<UnorderedList pl="1rem" listStyleType="none">
										{order.products.map((product) => (
											<ListItem key={product._id} display="flex" alignItems="center">
												<Text>{product.title}</Text>
												<ListIcon as={MdCheckCircle} color="green.500" ml="0.5rem" />
											</ListItem>
										))}
									</UnorderedList>
								</Text>
							</ListItem>
						))}
					</UnorderedList>
				</CardBody>
			</Flex>
		</Card>
	);
}

const cartStyle: SystemStyleObject = {
	marginTop: "var(--chakra-space-1)",
	bg: "#FFF9F4",
	border: "1px solid rgb(0,0,0, 0.2)",
	borderRadius: "0.625rem",
	px: "1rem",
	position: "relative",
};

const flexStyle: SystemStyleObject = {
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	rowGap: "1.25rem",
	textAlign: "center",
};
