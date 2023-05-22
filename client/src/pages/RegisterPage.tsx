import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

async function registerUser(email: string, password: string) {
	try {
		const response = await fetch("/api/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});

		if (response.ok) {
			console.log("Register successful");
		} else {
			console.log("Register failed");
		}
	} catch (error) {
		console.log("An error occurred:", error);
	}
}

function RegisterPage() {
	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		const form = event.currentTarget;
		const email = form.email.value;
		const password = form.password.value;

		registerUser(email, password);
	};
	return (
		<>
			<form onSubmit={handleFormSubmit}>
				<FormControl>
					<FormLabel>Email</FormLabel>
					<Input id="email" name="email" type="text" />
				</FormControl>

				<FormControl>
					<FormLabel>Password</FormLabel>
					<Input id="password" name="password" type="password" />
				</FormControl>

				<Button type="submit">Register</Button>
			</form>
		</>
	);
}

export default RegisterPage;
