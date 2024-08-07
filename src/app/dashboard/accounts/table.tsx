"use client";

import Datatable from "@/components/datatable";
import { getAllAdmin } from "@/lib/accounts";
import type { AdminType, EntityType } from "@/types/entity";
import type { ChipProps } from "@nextui-org/react";
import { Select, SelectItem, Tab, Tabs } from "@nextui-org/react";
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

	const activeAccounts = data?.filter((admin) => admin.is_show);
	const nonActiveAccounts = data?.filter((admin) => !admin.is_show);

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

	const renderCellAllAccounts = (data: AdminType, columnKey: React.Key) => {
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

	const renderCellAccounts = (data: AdminType, columnKey: React.Key) => {
		const cellValue = data[columnKey as keyof AdminType];

		const verifyAdmin = async (e: React.ChangeEvent<HTMLSelectElement>) => {
			const value = e.target.value;

			if (value === "konfirmasi") {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_BASE_URL}/api/confirm?key=${data.id}`,
					{
						method: "POST",
						headers: { Authorization: `Bearer ${token}` },
					},
				);
				const result = await response.json();
				if (result.success) {
					queryClient.invalidateQueries({ queryKey: ["admin-list"] });
					return toast.success("Berhasil mengubah status");
				}
				return toast.error("Gagal mengubah status");
			}

			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/api/reject?key=${data.id}`,
				{
					method: "DELETE",
					headers: { Authorization: `Bearer ${token}` },
				},
			);
			const result = await response.json();
			if (result.success) {
				queryClient.invalidateQueries({ queryKey: ["admin-list"] });
				return toast.success("Berhasil mengubah status");
			}
			return toast.error("Gagal mengubah status");
		};

		switch (columnKey) {
			case "is_active":
				return (
					<Select
						aria-label="status"
						onChange={verifyAdmin}
						placeholder="Pilih Status"
						disallowEmptySelection
					>
						<SelectItem key={"konfirmasi"} value={"konfirmasi"}>
							Konfirmasi
						</SelectItem>
						<SelectItem key={"tolak"} value={"tolak"}>
							Tolak
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
		<Tabs aria-label="Options" color="primary" variant="bordered" size="lg">
			<Tab key="active" title="Semua Akun">
				<Datatable
					data={activeAccounts ?? []}
					columns={columns}
					renderCell={renderCellAllAccounts}
					isLoading={isPending}
					label="Table Account Admin"
				/>
			</Tab>
			<Tab key="nonactive" title="Menunggu Konfirmasi">
				<Datatable
					data={nonActiveAccounts ?? []}
					columns={columns}
					renderCell={renderCellAccounts}
					isLoading={isPending}
					label="Table Account Admin"
				/>
			</Tab>
		</Tabs>
	);
};
