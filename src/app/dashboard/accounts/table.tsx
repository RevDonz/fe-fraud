"use client";

import Datatable from "@/components/datatable";
import { getAllAdmin } from "@/lib/accounts";
import type { AdminType, EntityType } from "@/types/entity";
import type { ChipProps } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
const statusColorMap: Record<string, ChipProps["color"]> = {
	active: "success",
	nonactive: "danger",
};

export const DataTableAccounts = ({ token }: { token: string }) => {
	const queryClient = useQueryClient();

	const { data, isPending, error } = useQuery({
		queryKey: ["admin-list"],
		queryFn: async () => {
			try {
				const data = await getAllAdmin(token);
				return data;
			} catch (error) {
				throw new Error("Error bang");
			}
		},
	});

	const columns = [
		{
			key: "name",
			sortable: true,
			label: "NAMA AKUN",
		},
		{
			key: "id",
			sortable: false,
			label: "ID",
		},
		{
			key: "email",
			sortable: false,
			label: "EMAIL",
		},
		{
			key: "is_active",
			sortable: false,
			label: "STATUS",
		},
	];

	const renderCellAccounts = (data: AdminType, columnKey: React.Key) => {
		const cellValue = data[columnKey as keyof AdminType];

		const verifyAdmin = async () => {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/api/verify/${data.id}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				},
			);

			const result = await response.json();
			if (result.success) {
				queryClient.invalidateQueries({ queryKey: ["admin-list"] });
				toast.success("Berhasil mengubah status");
			} else {
				toast.error("Gagal mengubah status");
			}
		};

		switch (columnKey) {
			case "is_active":
				return (
					<Select
						aria-label="status"
						color={cellValue ? "success" : "danger"}
						defaultSelectedKeys={cellValue ? ["aktif"] : ["nonaktif"]}
						onChange={verifyAdmin}
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

			case "name":
			case "address":
			case "phone":
			case "email":
				return data.institusi[columnKey as keyof EntityType];

			default:
				return cellValue as React.ReactNode;
		}
	};

	if (error) return <p>error bang</p>;

	return (
		<Datatable
			data={data ?? []}
			columns={columns}
			renderCell={renderCellAccounts}
			isLoading={isPending}
			label="Table Account Admin"
		/>
	);
};
