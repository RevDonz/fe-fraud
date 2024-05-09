"use client";

import Datatable from "@/components/datatable";
import { getAssesmentHistory } from "@/lib/assesment";
import { useQuery } from "@tanstack/react-query";
import {
	columns,
	renderCellFraudHistory,
	type FraudHistoryType,
} from "./column";

const TableHistroy = ({ token }: { token: string }) => {
	const { data, isLoading } = useQuery({
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
			data={data ?? []}
			columns={columns}
			renderCell={renderCellFraudHistory}
			isLoading={isLoading}
			label="Table Fraud Assesment"
		/>
	);
};

export default TableHistroy;
