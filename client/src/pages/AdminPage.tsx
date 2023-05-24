import { Box, Container, Heading } from "@chakra-ui/react";
import { AdminProducts } from "../components/AdminProducts";

export function AdminPage() {
	return (
		<Box mt="5rem" mb="1rem" bg={"pink"}>
			<Container as="section" maxWidth="container.xl">
				<Heading mb="1rem">Admin Page</Heading>
			</Container>
			<AdminProducts />
		</Box>
	);
}
