"use client";

import Datatable from "@/components/datatable";
import { getAllStaff } from "@/lib/staff";
import { useQuery } from "@tanstack/react-query";
import { columns, renderCellDataStaff, type StaffType } from "./columns";

const TableStaff = ({ token }: { token: string }) => {
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
