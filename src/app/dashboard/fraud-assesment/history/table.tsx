"use client";

import Datatable from "@/components/datatable";
import { getAssesmentHistory } from "@/lib/assesment";
import type { FraudHistoryType } from "@/types/assesment";
import { useQuery } from "@tanstack/react-query";
import { columns, renderCellFraudHistory } from "./column";

const TableHistroy = ({ token }: { token: string }) => {
	const { data, isPending } = useQuery({
		queryKey: ["fraud-history"],
		queryFn: async () => {
			const data = await getAssesmentHistory(token);
			return data;
		},
	});

	const compareDates = (a: FraudHistoryType, b: FraudHistoryType) => {
		const dateA = new Date(a.tanggal).getTime();
		const dateB = new Date(b.tanggal).getTime();
		return dateB - dateA;
	};

	// Mengurutkan array berdasarkan tanggal
	const sortedData = data?.sort(compareDates);

	return (
		<Datatable
			data={sortedData ?? []}
			columns={columns}
			renderCell={renderCellFraudHistory}
			isLoading={isPending}
			label="Table Fraud Assesment"
		/>
	);
};

export default TableHistroy;
