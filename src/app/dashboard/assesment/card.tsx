"use client";

import {
	Button,
	Card,
	CardBody,
	Chip,
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
import { format } from "date-fns";
import { Eye, EyeOff } from "lucide-react";
import { useCallback, useState } from "react";
import { FraudHistory, columns, type FraudHistoryType } from "./column";

export default function FraudAssesmentCard() {
	const [isVisible, setIsVisible] = useState(false);
	const toggleVisibility = () => setIsVisible(!isVisible);

	const renderCell = useCallback(
		(history: FraudHistoryType, columnKey: React.Key) => {
			const cellValue = history[columnKey as keyof FraudHistoryType];

			switch (columnKey) {
				case "hasil":
					return (
						<Chip
							color={
								history.hasil >= 75
									? "success"
									: history.hasil >= 60
									  ? "warning"
									  : "danger"
							}
							radius="sm"
							className="text-white"
						>
							{`${
								history.hasil >= 75
									? "Good"
									: history.hasil >= 60
									  ? "Normal"
									  : "Bad"
							} / ${history.hasil}`}
						</Chip>
					);

				// case "tanggal":
				// 	return format(cellValue, "dd MMMM yyyy, HH:mm");

				case "aksi":
					return (
						<Button color="primary" size="sm">
							Lihat Detail
						</Button>
					);

				default:
					return cellValue;
			}
		},
		[],
	);
	return (
		<Card className="p-3">
			<Tabs aria-label="Options" color="primary" variant="bordered">
				<Tab key="history" title="Riwayat Fraud Assesment">
					<Table aria-label="Example table with dynamic content">
						<TableHeader columns={columns}>
							{(column) => (
								<TableColumn key={column.key}>{column.label}</TableColumn>
							)}
						</TableHeader>
						<TableBody items={FraudHistory}>
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
				<Tab key="fill" title="Isi Fraud Assesment">
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
	);
}
