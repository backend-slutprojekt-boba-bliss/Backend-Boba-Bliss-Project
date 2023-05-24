import { Box, Container, Flex } from "@chakra-ui/react";
import { AdminCard } from "./AdminCard";
import { AdminOrders } from "./AdminOrders";
import { AdminProductsLayout } from "./AdminProductsLayout";

export function AdminProducts() {
	return (
		<Container maxWidth="container.xl" my=".3rem">
			<Flex
				direction={[
					"column-reverse",
					"column-reverse",
					"column-reverse",
					"row",
				]}
				justify={["center", "center", "center", "space-between"]}
				gap={1}
			>
				{/* Renders a list of product cards in a grid layout. Displays products managed by an admin */}
				<AdminProductsLayout />
				<Box as="aside" width={["100%", "100%", "96%", "40%"]}>
					<AdminCard />
					<AdminOrders />
				</Box>
			</Flex>
		</Container>
	);
}
