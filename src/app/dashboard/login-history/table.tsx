"use client";

import Datatable from "@/components/datatable";
import { getLoginHistory } from "@/lib/entity";
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

	const dataLoginHistoryWithId = data
		?.map((loginHistory: LoginHistoryType, index: number) => {
			return { ...loginHistory, id: `${index + 1}` };
		})
		.sort((a: LoginHistoryType, b: LoginHistoryType) => {
			return new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime();
		});

	const columns = [
		{
			key: "nama",
			label: "NAMA",
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
			key: "tanggal",
			label: "TANGGAL & WAKTU",
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
		/>
	);
};

export default TableLoginHistory;
