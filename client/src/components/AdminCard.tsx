import { CloseIcon } from "@chakra-ui/icons";
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Flex,
	Heading,
	HStack,
	IconButton,
	Spacer,
	SystemStyleObject,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { AdminForm } from "./AddProductForm";
import EditProductForm from "./EditProductForm";

export function AdminCard() {
	const location = useLocation();

	const editPage = location.pathname.includes("/product");
	const addPage = location.pathname.includes("/new");

	return (
		<Card sx={cartStyle}>
			<Flex sx={flexStyle}>
				{editPage && (
					<CardHeader pb="0" px="0" w="100%">
						{editPage && !addPage && (
							<HStack>
								<Heading size="md">Edit Product</Heading>
								<Spacer />
								<Link to="/admin">
									<IconButton
										aria-label="Close Edit Product"
										icon={<CloseIcon />}
									/>
								</Link>
							</HStack>
						)}
						{addPage && (
							<HStack>
								<Heading size="md">Add Product</Heading>
								<Spacer />
								<Link to="/admin">
									<IconButton
										aria-label="Close Add Product"
										icon={<CloseIcon />}
									/>
								</Link>
							</HStack>
						)}
					</CardHeader>
				)}
				<CardBody width="100%" p="0">
					{!addPage && !editPage && (
						<Link to="/admin/product/new">
							<Button sx={orderButtonStyle} data-cy="admin-add-product">
								Add product!
							</Button>
						</Link>
					)}
					<CardBody width="100%" p="0">
						{editPage && !addPage && <EditProductForm />}
						{addPage && <AdminForm />}
					</CardBody>
				</CardBody>
				<CardFooter sx={cardFooterStyle}></CardFooter>
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

const cardFooterStyle: SystemStyleObject = {
	width: "100%",
	display: "block",
	p: "0",
};
