"use client";

import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Input,
	Link,
} from "@nextui-org/react";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const LoginPage = () => {
	const [isVisible, setIsVisible] = useState(false);

	const toggleVisibility = () => setIsVisible(!isVisible);

	return (
		<div className="flex flex-col min-h-screen w-screen items-center justify-center">
			<Card className="max-w-sm w-full p-3">
				<CardHeader className="flex items-center justify-center">
					<h3 className="text-xl font-semibold">Login</h3>
				</CardHeader>
				<CardBody className="flex flex-col gap-3 items-center">
					<div className="w-full flex flex-col gap-3">
						<Input type="email" label="Email" variant="bordered" />
						<Input
							label="Password"
							variant="bordered"
							placeholder="Enter your password"
							endContent={
								<button
									className="focus:outline-none"
									type="button"
									onClick={toggleVisibility}
								>
									{isVisible ? (
										// <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
										<Eye className="text-default-400" />
									) : (
										// <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
										<EyeOff className="text-default-400" />
									)}
								</button>
							}
							type={isVisible ? "text" : "password"}
						/>
					</div>
				</CardBody>
				<CardFooter className="flex flex-col gap-5">
					<Button
						variant="solid"
						color="primary"
						className="w-full"
						as={Link}
						href="/home"
					>
						Masuk
					</Button>
					<div className="text-sm">
						Belum punya akun? <Link size="sm">Daftar</Link>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
};

export default LoginPage;
