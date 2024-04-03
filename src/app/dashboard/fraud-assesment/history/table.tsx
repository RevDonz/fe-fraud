"use client";
import Datatable from "@/components/datatable";
import { getDataAssesment } from "@/lib/fetch";
import { columns } from "./column";

const TableHistory = ({ token }: { token: string }) => {
	const { data, isLoading } = getDataAssesment(token as string);

	return (
		<Datatable
			data={isLoading ? [] : data}
			columns={columns}
			isLoading={isLoading}
			// renderCell={renderCellFraudHistory}
		/>
	);
};

export default TableHistory;
