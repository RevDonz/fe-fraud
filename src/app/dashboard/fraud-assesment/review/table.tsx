"use client";
import Datatable from "@/components/datatable";
import { getAssesmentHistory, getEvaluationAssesment } from "@/lib/assesment";
import type { FraudHistoryType } from "@/types/assesment";
import { Tab, Tabs } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import {
	columnsAssessed,
	columnsNotAssessed,
	renderCellHasAssessed,
	renderCellNotAssessed,
} from "./column";

const TableGrade = ({ token }: { token: string }) => {
	const { data, isPending } = useQuery({
		queryKey: ["fraud-history-not-assessed"],
		queryFn: async () => {
			const data = await getEvaluationAssesment(token);
			return data;
		},
	});

	const { data: dataAssessed, isPending: isAssessedPending } = useQuery({
		queryKey: ["fraud-history-assessed"],
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
	const sortedDataNotAssessed = data?.sort(compareDates);
	const sortedDataAssessed = dataAssessed
		?.sort(compareDates)
		.filter(
			(data) =>
				data.id_reviewer_internal !== "" && data.id_reviewer_internal !== null,
		);

	return (
		<Tabs aria-label="Options" color="primary" variant="bordered" size="lg">
			<Tab key="hasAssessed" title="Sudah Di nilai">
				<Datatable
					data={sortedDataAssessed ?? []}
					columns={columnsAssessed}
					renderCell={renderCellHasAssessed}
					isLoading={isAssessedPending}
					label="Table Fraud Assesment"
				/>
			</Tab>
			<Tab key="notAssessed" title="Belum Di nilai">
				<Datatable
					data={sortedDataNotAssessed ?? []}
					columns={columnsNotAssessed}
					renderCell={renderCellNotAssessed}
					isLoading={isPending}
					label="Table Fraud Assesment"
				/>
			</Tab>
		</Tabs>
	);
};

export default TableGrade;
