import { SystemStyleObject } from "@chakra-ui/react";

export function AdminOrderCard() {
	//const adminOrders = location.pathname.includes("/adminpage");

	//const location = useLocation();

	//const [ShowOrders, setShowOrders] = useState(false);

	//const handleButtonOnclick = () => {
	//	setShowOrders(true);
	//};

	//if (ShowOrders) {
//		return <AdminOrders />;
//	}

	return (
//		<Card sx={cartStyle}>
//			<CardBody>
//				<Button sx={orderButtonStyle} onClick={handleButtonOnclick}>
//					See orders
//				</Button>
//			</CardBody>
//		</Card>
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
