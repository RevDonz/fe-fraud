"use client";

import {
	Chip,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	type ChipProps,
} from "@nextui-org/react";
import { useCallback } from "react";
import { columns } from "./columns";

export type EntityType = {
	name: string;
	address: string;
	phone: string;
	email: string;
	key: string;
};

export type AdminType = {
	institusi: EntityType;
	id: string;
	email: string;
	is_active: boolean;
};

const statusColorMap: Record<string, ChipProps["color"]> = {
	active: "success",
	nonactive: "danger",
};

export const DataTableAccounts = ({ data }: { data: AdminType[] }) => {
	const renderCell = useCallback((data: AdminType, columnKey: React.Key) => {
		const cellValue = data[columnKey as keyof AdminType];

		switch (columnKey) {
			case "is_active":
				return (
					<Chip
						className="capitalize"
						color={statusColorMap[data.is_active ? "active" : "nonactive"]}
						variant="flat"
					>
						{cellValue ? "Active" : "Nonactive"}
					</Chip>
				);

			case "name":
			case "address":
			case "phone":
			case "email":
				return data.institusi[columnKey as keyof EntityType];

			default:
				return "";
		}
	}, []);
	return (
		<Table aria-label="Example table with dynamic content">
			<TableHeader columns={columns}>
				{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
			</TableHeader>
			<TableBody items={data}>
				{(item) => (
					<TableRow key={item.id}>
						{(columnKey) => (
							<TableCell>{renderCell(item, columnKey)}</TableCell>
						)}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
};
