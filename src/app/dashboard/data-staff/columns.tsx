"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";

export type StaffType = {
	full_name: string;
	email: string;
	role: string;
	status: boolean;
	id: string;
};

export const columns = [
	{
		key: "full_name",
		label: "NAMA AKUN",
	},
	{
		key: "email",
		label: "EMAIL",
	},
	{
		key: "role",
		label: "ROLE",
	},
	{
		key: "status",
		label: "AKSI",
	},
];

export const renderCellDataStaff = (staff: StaffType, columnKey: React.Key) => {
	const cellValue = staff[columnKey as keyof StaffType];

	switch (columnKey) {
		case "status":
			return (
				<Button
					color="primary"
					size="sm"
					as={Link}
					href={"/dashboard/fraud-assesment/"}
					// isDisabled={!history.selesai}
				>
					Lihat Detail
				</Button>
			);

      case "role":
        return <p className="capitalize">{cellValue}</p>

		default:
			return cellValue;
	}
};
