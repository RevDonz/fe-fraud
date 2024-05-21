"use client";
import Datatable from "@/components/datatable";
import { getEvaluationAssesment } from "@/lib/assesment";
import { Tab, Tabs } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import {
	columnsAssessed,
	columnsNotAssessed,
	renderCellHasAssessed,
	renderCellNotAssessed,
	type FraudHistoryType,
} from "./column";

const TableGrade = ({ token }: { token: string }) => {
	const { data, isLoading } = useQuery({
		queryKey: ["fraud-history"],
		queryFn: async () => {
			const data = await getEvaluationAssesment(token);
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
	const hasAssessed = sortedData?.filter((data) => data.selesai);
	const notAssessed = sortedData?.filter((data) => !data.selesai);

	return (
		<Tabs aria-label="Options" color="primary" variant="bordered" size="lg">
			<Tab key="hasAssessed" title="Sudah Di nilai">
				<Datatable
					data={hasAssessed ?? []}
					columns={columnsAssessed}
					renderCell={renderCellHasAssessed}
					isLoading={isLoading}
					label="Table Fraud Assesment"
				/>
			</Tab>
			<Tab key="notAssessed" title="Belum Di nilai">
				<Datatable
					data={notAssessed ?? []}
					columns={columnsNotAssessed}
					renderCell={renderCellNotAssessed}
					isLoading={isLoading}
					label="Table Fraud Assesment"
				/>
			</Tab>
		</Tabs>
	);
};

export default TableGrade;
