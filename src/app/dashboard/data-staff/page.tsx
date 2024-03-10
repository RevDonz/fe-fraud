"use client";

import {
	Button,
	Card,
	CardBody,
	Input,
	Select,
	SelectItem,
	Tab,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	Tabs,
} from "@nextui-org/react";
import { Eye, EyeOff } from "lucide-react";
import { useCallback, useState } from "react";
import { DataStaff, columns, type StaffType } from "./columns";

export default function DataStaffPage() {
	const [isVisible, setIsVisible] = useState(false);
	const toggleVisibility = () => setIsVisible(!isVisible);

	const renderCell = useCallback((staff: StaffType, columnKey: React.Key) => {
		const cellValue = staff[columnKey as keyof StaffType];
		const statusStaff = [
			{
				label: "Aktif",
				value: "aktif",
			},
			{
				label: "Nonaktif",
				value: "nonaktif",
			},
		];
		switch (columnKey) {
			case "status":
				return (
					<Select
						className="w-48"
						items={statusStaff}
						disallowEmptySelection
						defaultSelectedKeys={[staff.status]}
						color={staff.status === "aktif" ? "success" : "danger"}
					>
						{statusStaff.map((status) => {
							return (
								<SelectItem key={status.value} value={status.value}>
									{status.label}
								</SelectItem>
							);
						})}
					</Select>
				);

			default:
				return cellValue;
		}
	}, []);

	return (
		<div className="flex flex-col w-full max-w-screen-xl mx-auto px-6 py-10 gap-5">
			<p className="text-2xl font-semibold">Data Staff</p>
			<Card className="p-3">
				<Tabs aria-label="Options" color="primary" variant="bordered">
					<Tab key="photos" title="Semua Akun">
						<Table aria-label="Example table with dynamic content">
							<TableHeader columns={columns}>
								{(column) => (
									<TableColumn key={column.key}>{column.label}</TableColumn>
								)}
							</TableHeader>
							<TableBody items={DataStaff}>
								{(item) => (
									<TableRow key={item.id}>
										{(columnKey) => (
											<TableCell>{renderCell(item, columnKey)}</TableCell>
										)}
									</TableRow>
								)}
							</TableBody>
						</Table>
					</Tab>
					<Tab key="music" title="Tambah Akun">
						<Card className="p-3">
							<CardBody className="flex flex-col gap-5">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
									<Input
										autoFocus
										label="Nama"
										placeholder=" "
										type="text"
										variant="bordered"
										labelPlacement="outside"
									/>
									<Input
										label="Email"
										placeholder=" "
										type="email"
										variant="bordered"
										labelPlacement="outside"
									/>
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
										placeholder=" "
										type={isVisible ? "text" : "password"}
										variant="bordered"
										labelPlacement="outside"
									/>

									<Select
										label="Role"
										labelPlacement="outside"
										placeholder=" "
										variant="bordered"
									>
										<SelectItem key={"admin"} value={"admin"}>
											Admin
										</SelectItem>
										<SelectItem key={"staff"} value={"staff"}>
											Staff
										</SelectItem>
									</Select>
								</div>
								<Button color="primary" className="max-w-xs">
									Tambah Akun
								</Button>
							</CardBody>
						</Card>
					</Tab>
				</Tabs>
			</Card>
		</div>
	);
}
