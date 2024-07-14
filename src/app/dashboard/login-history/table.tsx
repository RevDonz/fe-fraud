"use client";

import Datatable from "@/components/datatable";
import { getLoginHistory } from "@/lib/entity";
import { formatTanggal } from "@/lib/utils";
import type { LoginHistoryType } from "@/types/entity";
import { useQuery } from "@tanstack/react-query";

const TableLoginHistory = ({ token }: { token: string }) => {
	const { data, isPending } = useQuery({
		queryKey: ["data-login-history"],
		queryFn: async () => {
			const data = await getLoginHistory(token);
			return data;
		},
	});

	const dataLoginHistoryWithId = data?.map(
		(loginHistory: LoginHistoryType, index: number) => {
			return { ...loginHistory, id: `${index + 1}` };
		},
	);

	const columns = [
		{
			key: "nama",
			label: "NAMA",
			sortable: true,
		},
		{
			key: "email",
			label: "EMAIL",
			sortable: false,
		},
		{
			key: "role",
			label: "ROLE",
			sortable: true,
		},
		{
			key: "tanggal",
			label: "TANGGAL & WAKTU",
			sortable: true,
		},
		{
			key: "event",
			label: "AKTIVITAS",
			sortable: true,
		},
	];

	const renderCellDataStaff = (
		loginHistory: LoginHistoryType,
		columnKey: React.Key,
	) => {
		const cellValue = loginHistory[columnKey as keyof LoginHistoryType];

		switch (columnKey) {
			case "role":
				return <p className="capitalize">{cellValue}</p>;

			case "tanggal": {
				return <p>{formatTanggal(cellValue as string)}</p>;
			}

			default:
				return cellValue;
		}
	};

	return (
		<Datatable
			data={dataLoginHistoryWithId ?? []}
			columns={columns}
			renderCell={renderCellDataStaff}
			isLoading={isPending}
			label="Table Data Staff"
			rowPage={10}
			filterOptions={[
				{
					column: "role",
					label: "Role",
					options: [
						{ name: "Admin", uid: "admin" },
						{ name: "Staff", uid: "staff" },
						{ name: "Reviewer", uid: "reviewer" },
					],
				},
				{
					column: "event",
					label: "Aktivitas",
					options: [
						{ name: "Logged In", uid: "Logged In" },
						{ name: "Submit Point", uid: "Submit Point" },
						{ name: "Submitted Assessment", uid: "Submitted Assessment" },
					],
				},
			]}
		/>
	);
};

export default TableLoginHistory;
