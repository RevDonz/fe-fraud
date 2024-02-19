"use client";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "@/schema/auth/login-schema";
import { Button, CardBody, CardFooter, Input, Link } from "@nextui-org/react";
import { Eye, EyeOff, User } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const LoginForm = () => {
	const [isVisible, setIsVisible] = useState(false);
	const toggleVisibility = () => setIsVisible(!isVisible);
	const router = useRouter();

	const { handleSubmit, control, reset } = useForm<z.infer<typeof loginSchema>>(
		{
			resolver: zodResolver(loginSchema),
			defaultValues: {
				username: "",
				password: "",
			},
		},
	);

	const onSubmit = async (values: z.infer<typeof loginSchema>) => {
		try {
			const result = signIn("credentials", {
				username: values.username,
				password: values.password,
				redirect: false,
			});

			toast.promise(result, {
				loading: "Loading...",
				success: () => {
					reset();
					router.push("/home");
					return "Login Berhasil!";
				},
				error: (result) => {
					console.error(result.error);
					return "Invalid credentials";
				},
			});
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<CardBody className="flex flex-col gap-3 items-center">
				<div className="w-full flex flex-col gap-3">
					<Controller
						name="username"
						control={control}
						render={({ field }) => (
							<Input
								autoFocus
								endContent={<User className="text-default-400" />}
								label="Username"
								placeholder="Enter your username"
								type="text"
								variant="bordered"
								{...field}
							/>
						)}
					/>
					<Controller
						name="password"
						control={control}
						render={({ field }) => (
							<Input
								endContent={
									<button
										className="focus:outline-none"
										type="button"
										onClick={toggleVisibility}
									>
										{isVisible ? (
											<Eye className="text-default-400" />
										) : (
											<EyeOff className="text-default-400" />
										)}
									</button>
								}
								label="Password"
								placeholder="Enter your password"
								type={isVisible ? "text" : "password"}
								variant="bordered"
								{...field}
							/>
						)}
					/>
				</div>
			</CardBody>
			<CardFooter className="flex flex-col gap-5">
				<Button
					variant="solid"
					color="primary"
					className="w-full"
					type="submit"
				>
					Masuk
				</Button>
				<div className="text-sm">
					Belum punya akun? <Link size="sm">Daftar</Link>
				</div>
			</CardFooter>
		</form>
	);
};

export default LoginForm;
