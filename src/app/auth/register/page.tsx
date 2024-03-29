import { Card, CardHeader } from "@nextui-org/react";
import RegisterForm from "./form";

const RegisterPage = async () => {
	return (
		<div className="flex flex-col items-center justify-center h-full">
			<Card className="w-full p-3 max-w-screen-lg rounded-none lg:rounded-lg">
				<CardHeader className="flex items-center justify-center">
					<h3 className="text-xl font-semibold">Pendaftaran Akun</h3>
				</CardHeader>
				<RegisterForm />
			</Card>
		</div>
	);
};

export default RegisterPage;
