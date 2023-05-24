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
import { useState } from "react";
import { MdCheckCircle } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { useOrder } from "../contexts/orderContext";
export function AdminOrders() {
	const location = useLocation();
	const { orderList } = useOrder();

	const [showOrders, setShowOrders] = useState(false);

	const handleButtonOnClick = () => {
		setShowOrders(true);
	};

	const handleCloseOrders = () => {
		setShowOrders(false);
	};

	const cardBodyFontSize = useBreakpointValue({ base: "1rem", sm: "1.2rem" });

	if (showOrders) {
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
								<ListItem
									key={order.orderId}
									style={{ display: "flex", alignItems: "center" }}
								>
									<ListIcon as={MdCheckCircle} color="green.500" />
									<Text>
										Order ID: {order.orderId} Total price: {order.totalPrice}{" "}
									</Text>
								</ListItem>
							))}
						</UnorderedList>
					</CardBody>
				</Flex>
			</Card>
		);
	}

	return (
		<Card sx={cartStyle}>
			<Flex sx={flexStyle}>
				<CardBody width="100%" p="0" mb="4">
					<Button sx={orderButtonStyle} onClick={handleButtonOnClick}>
						See orders!
					</Button>
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

const orderButtonStyle: SystemStyleObject = {
	mt: "1.1rem",
	width: "100%",
	bg: "lightGreenButton",
	color: "black",
};