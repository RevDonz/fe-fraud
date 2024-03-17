"use client";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerSchema } from "@/schema/auth/register-schema";
import {
	Button,
	CardBody,
	CardFooter,
	Divider,
	Input,
	Link,
} from "@nextui-org/react";
import { Eye, EyeOff, Mail, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

const RegisterForm = () => {
	const [isVisible, setIsVisible] = useState(false);
	const toggleVisibility = () => setIsVisible(!isVisible);
	const router = useRouter();

	const {
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof registerSchema>) => {
		try {
			// const result = signIn("credentials", {
			// 	username: values.username,
			// 	email: values.email,
			// 	password: values.password,
			// 	redirect: false,
			// });

			const result = fetch("https://proj_ta-1-p8898073.deta.app/register", {
				method: "POST",
				body: JSON.stringify({
					username: values.username,
					email: values.email,
					password: values.password,
				}),
				headers: { "Content-Type": "application/json" },
			});

			toast.promise(result, {
				loading: "Loading...",
				success: (data) => {
					reset();
					router.push("/login");
					return "Register Akun Berhasil!";
				},
				error: (result) => {
					console.error(result);
					return "Invalid credentials";
				},
			});
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<CardBody className="flex flex-col gap-3">
				<p className="text-xl font-semibold">Profil Pendaftar</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
					<Controller
						name="namaPendaftar"
						control={control}
						render={({ field }) => (
							<Input
								autoFocus
								label="Nama Pendaftar"
								placeholder=" "
								type="text"
								variant="bordered"
								labelPlacement="outside"
								isInvalid={errors.namaPendaftar ? true : false}
								errorMessage={errors.namaPendaftar?.message}
								{...field}
							/>
						)}
					/>
					<Controller
						name="jabatan"
						control={control}
						render={({ field }) => (
							<Input
								autoFocus
								label="Jabatan / Posisi Pendaftar"
								placeholder=" "
								type="text"
								variant="bordered"
								labelPlacement="outside"
								isInvalid={errors.jabatan ? true : false}
								errorMessage={errors.jabatan?.message}
								{...field}
							/>
						)}
					/>
					<Controller
						name="noTelp"
						control={control}
						render={({ field }) => (
							<Input
								autoFocus
								label="No. Telp Pendaftar"
								placeholder=" "
								type="text"
								variant="bordered"
								labelPlacement="outside"
								isInvalid={errors.noTelp ? true : false}
								errorMessage={errors.noTelp?.message}
								{...field}
							/>
						)}
					/>
					<Controller
						name="emailPendaftar"
						control={control}
						render={({ field }) => (
							<Input
								autoFocus
								label="Email Pendaftar"
								placeholder=" "
								type="text"
								variant="bordered"
								labelPlacement="outside"
								isInvalid={errors.emailPendaftar ? true : false}
								errorMessage={errors.emailPendaftar?.message}
								{...field}
							/>
						)}
					/>
				</div>
				<Divider className="my-3" />
				<p className="text-xl font-semibold">Profil Instansi</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
					<Controller
						name="namaInstansi"
						control={control}
						render={({ field }) => (
							<Input
								autoFocus
								label="Nama Instansi"
								placeholder=" "
								type="text"
								variant="bordered"
								labelPlacement="outside"
								isInvalid={errors.namaInstansi ? true : false}
								errorMessage={errors.namaInstansi?.message}
								{...field}
							/>
						)}
					/>
					<Controller
						name="alamatInstansi"
						control={control}
						render={({ field }) => (
							<Input
								autoFocus
								label="Alamat Instansi"
								placeholder=" "
								type="text"
								variant="bordered"
								labelPlacement="outside"
								isInvalid={errors.alamatInstansi ? true : false}
								errorMessage={errors.alamatInstansi?.message}
								{...field}
							/>
						)}
					/>
					<Controller
						name="noTelpInstansi"
						control={control}
						render={({ field }) => (
							<Input
								autoFocus
								label="No. Telp Instansi"
								placeholder=" "
								type="text"
								variant="bordered"
								labelPlacement="outside"
								isInvalid={errors.noTelpInstansi ? true : false}
								errorMessage={errors.noTelpInstansi?.message}
								{...field}
							/>
						)}
					/>
					<Controller
						name="emailInstansi"
						control={control}
						render={({ field }) => (
							<Input
								autoFocus
								label="Email Instansi"
								placeholder=" "
								type="text"
								variant="bordered"
								labelPlacement="outside"
								isInvalid={errors.emailInstansi ? true : false}
								errorMessage={errors.emailInstansi?.message}
								{...field}
							/>
						)}
					/>
				</div>
				<Divider className="my-3" />
				<p className="text-xl font-semibold">Kredensial Akun</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
					<Controller
						name="username"
						control={control}
						render={({ field }) => (
							<Input
								autoFocus
								endContent={<User className="text-default-400" />}
								className="col-span-2"
								label="Username"
								placeholder="Enter your username"
								type="text"
								variant="bordered"
								labelPlacement="outside"
								isInvalid={errors.username ? true : false}
								errorMessage={errors.username?.message}
								{...field}
							/>
						)}
					/>
					<Controller
						name="email"
						control={control}
						render={({ field }) => (
							<Input
								autoFocus
								endContent={<Mail className="text-default-400" />}
								label="Email"
								placeholder="Enter your email"
								labelPlacement="outside"
								type="text"
								variant="bordered"
								isInvalid={errors.email ? true : false}
								errorMessage={errors.email?.message}
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
								labelPlacement="outside"
								type={isVisible ? "text" : "password"}
								variant="bordered"
								isInvalid={errors.password ? true : false}
								errorMessage={errors.password?.message}
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
					Register
				</Button>
				<div className="text-sm">
					Sudah punya akun?{" "}
					<Link href="/auth/login" size="sm">
						Login
					</Link>
				</div>
			</CardFooter>
		</form>
	);
};

export default RegisterForm;
