import { Card, CardHeader } from "@nextui-org/react";
import LoginForm from "./form";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Login | Fraud Deterrence Propeller",
	description:
		"Fraud Deterrence Propeller merupakan protokol pencegahan Fraud yang digunakan oleh setiap entitas, baik yang berorientasi profit maupun non-profit.",
};

const LoginPage = async () => {
	return (
		<div className="flex flex-col h-full items-center justify-center">
			<Card className="max-w-sm w-full p-3">
				<CardHeader className="flex items-center justify-center">
					<h3 className="text-xl font-semibold">Login</h3>
				</CardHeader>
				<LoginForm />
			</Card>
		</div>
	);
};

export default LoginPage;
