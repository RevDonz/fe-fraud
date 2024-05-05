"use client";

import Datatable from "@/components/datatable";
import { getAllAdmin } from "@/lib/accounts";
import { useQuery } from "@tanstack/react-query";
import { columns, renderCellAccounts } from "./columns";

export const DataTableAccounts = ({ token }: { token: string }) => {
	const { data, isLoading, error } = useQuery({
		queryKey: ["fraud-history"],
		queryFn: async () => {
			try {
				const data = await getAllAdmin(token);
				return data;
			} catch (error) {
				throw new Error("Error bang");
			}
		},
	});

	if (error) return <p>error bang</p>;

	return (
		<Datatable
			data={data ?? []}
			columns={columns}
			renderCell={renderCellAccounts}
			isLoading={isLoading}
			label="Table Account Admin"
		/>
	);
};
