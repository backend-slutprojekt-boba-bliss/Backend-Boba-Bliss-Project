import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

async function loginUser(email: string, password: string) {
	try {
		const response = await fetch("/api/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});

		if (response.ok) {
			// Successful login logic
			console.log("Login successful");
		} else {
			// Handle login error
			console.log("Login failed");
		}
	} catch (error) {
		console.log("An error occurred:", error);
	}
}

function LoginPage() {
	const [loginType, setLoginType] = useState("user");

	const handleLoginChange = (type: string) => {
		setLoginType(type);
	};

	const handleNavigateToRegisterForm = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		const navigate = useNavigate();
		navigate("registerPage");
	};

	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const form = event.currentTarget;
		const email = form.email.value;
		const password = form.password.value;

		loginUser(email, password);
	};

	return (
		<>
			<form onSubmit={handleFormSubmit}>
				<div>
					<label>
						<Input
							type="radio"
							value="user"
							checked={loginType === "user"}
							onChange={() => handleLoginChange("user")}
						/>
						User
					</label>
					<label>
						<Input
							type="radio"
							value="admin"
							checked={loginType === "admin"}
							onChange={() => handleLoginChange("admin")}
						/>
						Admin
					</label>
				</div>
				<FormControl>
					<FormLabel>Email</FormLabel>
					<Input id="email" name="email" type="text" />
				</FormControl>

				<FormControl>
					<FormLabel>Password</FormLabel>
					<Input id="password" name="password" type="password" />
				</FormControl>
				{loginType === "user" && (
					<Button onClick={handleNavigateToRegisterForm}>Register </Button>
				)}
				<Button type="submit">Log In</Button>
			</form>
		</>
	);
}

export default LoginPage;
