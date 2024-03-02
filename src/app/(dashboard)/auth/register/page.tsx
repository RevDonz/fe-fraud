import { Card, CardHeader } from "@nextui-org/react";
import RegisterForm from "./form";

const RegisterPage = async () => {
	return (
		<div className="flex flex-col min-h-screen w-screen items-center justify-center">
			<Card className="max-w-sm w-full p-3">
				<CardHeader className="flex items-center justify-center">
					<h3 className="text-xl font-semibold">Register</h3>
				</CardHeader>
				<RegisterForm />
			</Card>
		</div>
	);
};

export default RegisterPage;
