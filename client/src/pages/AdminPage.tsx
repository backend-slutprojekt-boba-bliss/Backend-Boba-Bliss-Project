import { Box, Container, Heading } from "@chakra-ui/react";
import { AdminProducts } from "../components/AdminProducts";
import { AuthContext } from "../contexts/AuthContext.";
import { useContext } from "react";
import { Navigate } from "react-router-dom";



export function AdminPage() {
		const { isAdmin } = useContext(AuthContext);
	  
		// Check if the user is an admin, otherwise navigate to a different page
		if (!isAdmin) {
		  return <Navigate to="/" />;
		}
	return (
		<Box mt="5rem" mb="1rem" bg={"pink"}>
			<Container as="section" maxWidth="container.xl">
				<Heading mb="1rem">Admin Page</Heading>
			</Container>
			<AdminProducts />
		</Box>
	);
}
