"use client";
import { staffSchema } from "@/schema/staffSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Divider, Input } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import type { z } from "zod";

export default function CreateStaffForm() {
	const {
		handleSubmit,
		control,
		reset,
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

	return (
		<div className="flex flex-col gap-3">
			<p className="text-xl font-semibold">Profil Staff</p>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
						<Input
							autoFocus
							label="Role"
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
					name="phone"
					control={control}
					render={({ field }) => (
						<Input
							autoFocus
							label="No. Telp"
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
							isInvalid={!!errors.full_name}
							errorMessage={errors.full_name?.message}
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
							label="Username"
							placeholder=" "
							type="text"
							variant="bordered"
							labelPlacement="outside"
							className="col-span-2"
							isInvalid={!!errors.full_name}
							errorMessage={errors.full_name?.message}
							{...field}
						/>
					)}
				/>
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
			</div>
			<Button color="primary">Tambah Akun</Button>
		</div>
	);
}
