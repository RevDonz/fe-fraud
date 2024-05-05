import type { AdminType, EntityType } from "@/types/entity";
import { Chip, type ChipProps } from "@nextui-org/react";

export type StaffType = {
	id: string;
	name: string;
	email: string;
	role: string;
	status: string;
};

export const columns = [
	{
		key: "name",
		label: "NAMA AKUN",
	},
	{
		key: "email",
		label: "EMAIL",
	},
	{
		key: "address",
		label: "ADDRESS",
	},
	{
		key: "is_active",
		label: "STATUS",
	},
];

const statusColorMap: Record<string, ChipProps["color"]> = {
	active: "success",
	nonactive: "danger",
};

export const renderCellAccounts = (data: AdminType, columnKey: React.Key) => {
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
};
