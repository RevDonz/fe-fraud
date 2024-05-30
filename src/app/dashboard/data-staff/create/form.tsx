"use client";
import { staffSchema } from "@/schema/staffSchema";
import type { EntityType } from "@/types/entity";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Divider, Input, Select, SelectItem } from "@nextui-org/react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

export default function CreateStaffForm({
	token,
	entity,
}: { token: string; entity: EntityType }) {
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<z.infer<typeof staffSchema>>({
		resolver: zodResolver(staffSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
			full_name: "",
			role: "",
			phone: "",
		},
	});

	const [isVisible, setIsVisible] = useState(false);
	const toggleVisibility = () => setIsVisible(!isVisible);
	const [isVisible2, setIsVisible2] = useState(false);
	const toggleVisibility2 = () => setIsVisible2(!isVisible2);
	const router = useRouter();

	const onSubmit = async (values: z.infer<typeof staffSchema>) => {
		try {
			toast.loading("Loading...");

			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/api/account`,
				{
					method: "POST",
					body: JSON.stringify({
						full_name: values.full_name,
						role: values.role,
						phone: values.phone,
						username: values.username,
						email: values.email,
						password: values.password,
					}),
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				},
			);

			const result = await response.json();

			toast.dismiss();

			if (result.success) {
				toast.success("Berhasil!");

				router.push("/dashboard/data-staff");
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
			<div className="flex flex-col gap-5">
				<p className="text-xl font-semibold">Profil Staff</p>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
					<Controller
						name="full_name"
						control={control}
						render={({ field }) => (
							<Input
								autoFocus
								label="Nama"
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
							<Select
								variant="bordered"
								label="Peran / Role"
								labelPlacement="outside"
								placeholder=" "
								disallowEmptySelection
								isInvalid={!!errors.role}
								errorMessage={errors.role?.message}
								{...field}
							>
								<SelectItem key={"staff"} value={"staff"}>
									Staff
								</SelectItem>
								<SelectItem key={"reviewer"} value={"reviewer"}>
									Reviewer
								</SelectItem>
							</Select>
						)}
					/>
					<Controller
						name="phone"
						control={control}
						render={({ field }) => (
							<Input
								autoFocus
								label="No. Telp"
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
								label="Email"
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
					<Controller
						name="username"
						control={control}
						render={({ field }) => (
							<Input
								autoFocus
								label="Username"
								placeholder=" "
								type="text"
								variant="bordered"
								labelPlacement="outside"
								className="col-span-2"
								isInvalid={!!errors.username}
								errorMessage={errors.username?.message}
								{...field}
							/>
						)}
					/>
					<Controller
						name="password"
						control={control}
						render={({ field }) => (
							<Input
								autoFocus
								label="Password"
								placeholder=" "
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
								type={isVisible ? "text" : "password"}
								variant="bordered"
								labelPlacement="outside"
								isInvalid={!!errors.password}
								errorMessage={errors.password?.message}
								{...field}
							/>
						)}
					/>
					<Controller
						name="confirm_password"
						control={control}
						render={({ field }) => (
							<Input
								autoFocus
								label="Konfirmasi Password"
								placeholder=" "
								endContent={
									<button
										className="focus:outline-none"
										type="button"
										onClick={toggleVisibility2}
									>
										{isVisible2 ? (
											<Eye className="text-default-400" />
										) : (
											<EyeOff className="text-default-400" />
										)}
									</button>
								}
								type={isVisible2 ? "text" : "password"}
								variant="bordered"
								labelPlacement="outside"
								isInvalid={!!errors.confirm_password}
								errorMessage={errors.confirm_password?.message}
								{...field}
							/>
						)}
					/>
				</div>
				<Divider className="my-3" />
				<p className="text-xl font-semibold">Profil Entitas</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
					<Input
						autoFocus
						label="Nama Entitas"
						placeholder=" "
						type="text"
						variant="faded"
						labelPlacement="outside"
						isDisabled
						defaultValue={entity.name}
					/>

					<Input
						autoFocus
						label="Alamat Entitas"
						placeholder=" "
						type="text"
						variant="faded"
						labelPlacement="outside"
						defaultValue={entity.address}
						isDisabled
					/>

					<Input
						autoFocus
						label="No. Telp Entitas"
						placeholder=" "
						type="text"
						variant="faded"
						labelPlacement="outside"
						defaultValue={entity.phone}
						isDisabled
					/>

					<Input
						autoFocus
						label="Email Entitas"
						placeholder=" "
						type="text"
						variant="faded"
						labelPlacement="outside"
						defaultValue={entity.email}
						isDisabled
					/>
				</div>
				<Divider className="my-3" />
				<Button color="primary" type="submit">
					Tambah Akun
				</Button>
			</div>
		</form>
	);
}
