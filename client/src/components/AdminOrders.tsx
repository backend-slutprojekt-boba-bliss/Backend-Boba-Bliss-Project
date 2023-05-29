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
		// Perform any necessary cleanup or reset operations here
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
				<CardBody fontSize={cardBodyFontSize} width="100%" p="0">
					<UnorderedList listStyleType="none" marginInlineStart="0">
						{orderList.map((order) => (
							<ListItem key={order._id}>
								<Text fontSize="10px">
									Ordernumber: {order._id}, Customer:{" "}
									{order.deliveryAddress.firstName},{" "}
									{order.deliveryAddress.lastName},{" "}
									{order.deliveryAddress.city},{" "}
									{order.deliveryAddress.zipCode}, Created:{" "}
									{new Date(order.createdAt).toLocaleDateString()}
									{order.products.map((product) => (
										<ListItem key={product._id}>
											{product.title}
											<ListIcon as={MdCheckCircle} color="green.500" />
										</ListItem>
									))}
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
