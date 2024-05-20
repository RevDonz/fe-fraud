"use client";

import Datatable from "@/components/datatable";
import { getAllStaff } from "@/lib/staff";
import type { StaffType } from "@/types/entity";
import { Select, SelectItem } from "@nextui-org/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const TableStaff = ({ token }: { token: string }) => {
	const queryClient = useQueryClient();

	const { data, isLoading } = useQuery({
		queryKey: ["data-staff"],
		queryFn: async () => {
			const data = await getAllStaff(token);
			return data;
		},
	});

	const DataStaffWithId = data?.map((staff: StaffType, index: number) => {
		return { ...staff, id: `${index + 1}` };
	});

	const columns = [
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

	const renderCellDataStaff = (staff: StaffType, columnKey: React.Key) => {
		const cellValue = staff[columnKey as keyof StaffType];

		const verifyStaff = async (e: React.ChangeEvent<HTMLSelectElement>) => {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/api/alter?user_key=${staff.key}`,
				{
					method: "PATCH",
					headers: { Authorization: `Bearer ${token}` },
				},
			);

			const result = await response.json();
			if (result.success) {
				queryClient.invalidateQueries({ queryKey: ["data-staff"] });
				toast.success("Berhasil mengubah status");
			} else {
				toast.error("Gagal mengubah status");
			}
		};

		switch (columnKey) {
			case "status":
				return (
					<Select
						aria-label="status"
						color={cellValue ? "success" : "danger"}
						defaultSelectedKeys={cellValue ? ["aktif"] : ["nonaktif"]}
						onChange={verifyStaff}
						disallowEmptySelection
					>
						<SelectItem key={"aktif"} value={"aktif"}>
							Aktif
						</SelectItem>
						<SelectItem key={"nonaktif"} value={"nonaktif"}>
							Nonaktif
						</SelectItem>
					</Select>
				);

			case "role":
				return <p className="capitalize">{cellValue}</p>;

			default:
				return cellValue;
		}
	};

	return (
		<Datatable
			data={DataStaffWithId ?? []}
			columns={columns}
			renderCell={renderCellDataStaff}
			isLoading={isLoading}
			label="Table Data Staff"
		/>
	);
};

export default TableStaff;
