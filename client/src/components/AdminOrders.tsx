import { Box, List, ListIcon, ListItem, Text } from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";
import { useOrder } from "../orderContext";

export function AdminOrders() {
	const { orderList } = useOrder();

	return (
		<Box>
			<Text>Orders</Text>
			<List spacing={3}>
				{orderList.map((order) => (
					<ListItem key={order.orderId}>
						<ListIcon as={MdCheckCircle} color="green.500" />
						<span>Order ID: {order.orderId}</span>
						<span>Total price: {order.totalPrice}</span>
					</ListItem>
				))}
			</List>
		</Box>
	);
}
