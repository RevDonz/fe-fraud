"use client";

import Datatable from "@/components/datatable";
import { getAssesmentHistory } from "@/lib/assesment";
import { useQuery } from "@tanstack/react-query";
import { columns, renderCellFraudHistory } from "./column";

const TableCoba = ({ token }: { token: string }) => {
	const { data, isLoading } = useQuery({
		queryKey: ["fraud-history"],
		queryFn: async () => {
			const data = await getAssesmentHistory(token);
			return data;
		},
	});

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

export default TableCoba;
