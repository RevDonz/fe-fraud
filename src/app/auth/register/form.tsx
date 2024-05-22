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
			full_name: "",
			role: "",
			phone: "",
			institution_name: "",
			institution_address: "",
			institution_phone: "",
			institution_email: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof registerSchema>) => {
		try {
			toast.loading("Loading...");

			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/api/register`,
				{
					method: "POST",
					body: JSON.stringify({
						username: values.username,
						email: values.email,
						password: values.password,
						full_name: values.full_name,
						role: "admin",
						phone: values.phone,
						institution_name: values.institution_name,
						institution_address: values.institution_address,
						institution_phone: values.institution_phone,
						institution_email: values.institution_email,
					}),
					headers: { "Content-Type": "application/json" },
				},
			);

			const result = await response.json();

			toast.dismiss();

			if (result.success) {
				toast.success("Berhasil!", {
					duration: 10000,
					closeButton: true,
					description: (
						<p>
							Cek email <strong>{values.email}</strong> untuk memverifikasi akun
							Anda
						</p>
					),
				});

				router.push("/auth/login");
			} else {
				toast.error("Gagal!", {
					description: <p>Terdapat kesalahan</p>,
				});
			}
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
						name="full_name"
						control={control}
						render={({ field }) => (
							<Input
								autoFocus
								label="Nama Pendaftar"
								placeholder=" "
								type="text"
								variant="bordered"
								labelPlacement="outside"
								isInvalid={!!errors.full_name}
								errorMessage={errors.full_name?.message}
								{...field}
							/>
						)}
					/>
					<Controller
						name="role"
						control={control}
						render={({ field }) => (
							<Input
								autoFocus
								label="Jabatan / Posisi Pendaftar"
								placeholder=" "
								type="text"
								variant="bordered"
								labelPlacement="outside"
								isInvalid={!!errors.role}
								errorMessage={errors.role?.message}
								{...field}
							/>
						)}
					/>
					<Controller
						name="phone"
						control={control}
						render={({ field }) => (
							<Input
								autoFocus
								label="No. Telp Pendaftar"
								placeholder=" "
								type="number"
								variant="bordered"
								labelPlacement="outside"
								isInvalid={!!errors.phone}
								errorMessage={errors.phone?.message}
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
								label="Email Pendaftar"
								placeholder=" "
								type="text"
								variant="bordered"
								labelPlacement="outside"
								isInvalid={!!errors.email}
								errorMessage={errors.email?.message}
								{...field}
							/>
						)}
					/>
				</div>
				<Divider className="my-3" />
				<p className="text-xl font-semibold">Profil Entitas</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
					<Controller
						name="institution_name"
						control={control}
						render={({ field }) => (
							<Input
								autoFocus
								label="Nama Entitas"
								placeholder=" "
								type="text"
								variant="bordered"
								labelPlacement="outside"
								isInvalid={!!errors.institution_name}
								errorMessage={errors.institution_name?.message}
								{...field}
							/>
						)}
					/>
					<Controller
						name="institution_address"
						control={control}
						render={({ field }) => (
							<Input
								autoFocus
								label="Alamat Entitas"
								placeholder=" "
								type="text"
								variant="bordered"
								labelPlacement="outside"
								isInvalid={!!errors.institution_address}
								errorMessage={errors.institution_address?.message}
								{...field}
							/>
						)}
					/>
					<Controller
						name="institution_phone"
						control={control}
						render={({ field }) => (
							<Input
								autoFocus
								label="No. Telp Entitas"
								placeholder=" "
								type="number"
								variant="bordered"
								labelPlacement="outside"
								isInvalid={!!errors.institution_phone}
								errorMessage={errors.institution_phone?.message}
								{...field}
							/>
						)}
					/>
					<Controller
						name="institution_email"
						control={control}
						render={({ field }) => (
							<Input
								autoFocus
								label="Email Entitas"
								placeholder=" "
								type="text"
								variant="bordered"
								labelPlacement="outside"
								isInvalid={!!errors.institution_email}
								errorMessage={errors.institution_email?.message}
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
								isInvalid={!!errors.username}
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
								isInvalid={!!errors.email}
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
								isInvalid={!!errors.password}
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
