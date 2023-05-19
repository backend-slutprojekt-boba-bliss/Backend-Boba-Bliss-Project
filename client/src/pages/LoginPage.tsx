import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react";

type loginType = "user" | "admin";

function LoginPage() {
	const [loginType, setloginType] = useState<loginType>("user");

	const handleLoginChange = (type: loginType) => {
		setloginType(type);
	};

	return (
		<>
			<form>
				<div>
					<Input
						type="radio"
						value="user"
						checked={loginType === "user"}
						onChange={() => handleLoginChange}
					/>
					<Input
						type="radio"
						value="admin"
						checked={loginType === "admin"}
						onChange={() => handleLoginChange}
					/>
				</div>
				<FormControl>
					<FormLabel>Email</FormLabel>
					<Input id="email" name="email" type="text" />
				</FormControl>

				<FormControl>
					<FormLabel>Password</FormLabel>
					<Input id="password" name="password" type="password" />
				</FormControl>
				{loginType === "user" && <Button>Register </Button>}
			</form>
		</>
	);
}

export default LoginPage;
