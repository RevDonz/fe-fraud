import { Card, CardHeader } from "@nextui-org/react";
import type { Metadata } from "next";
import RegisterForm from "./form";

export const metadata: Metadata = {
	title: "Register | Fraud Deterrence Propeller",
	description:
		"Fraud Deterrence Propeller merupakan protokol pencegahan Fraud yang digunakan oleh setiap entitas, baik yang berorientasi profit maupun non-profit.",
};

const RegisterPage = async () => {
	return (
		<div className="flex flex-col items-center justify-center h-full py-10">
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
