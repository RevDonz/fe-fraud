"use client";
import Datatable from "@/components/datatable";
import { getAssesmentHistory, getEvaluationAssesment } from "@/lib/assesment";
import type { FraudHistoryType } from "@/types/assesment";
import { Tab, Tabs, useDisclosure } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
	columnsAssessed,
	columnsNotAssessed,
	renderCellHasAssessed,
} from "./column";
import ModalEvaluation from "./modal-fraud-evaluation";

const TableGrade = ({ token }: { token: string }) => {
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
	const [isChecked, setIsChecked] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

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

	const sortedDataNotAssessed = dataAssessed
		?.sort(compareDates)
		.filter((data) => data.id_reviewer_internal === null);
	const sortedDataAssessed = dataAssessed
		?.sort(compareDates)
		.filter((data) => data.id_reviewer_internal !== null);

	const renderCellNotAssessed = (
		history: FraudHistoryType,
		columnKey: React.Key,
	) => {
		const cellValue = history[columnKey as keyof FraudHistoryType];

		switch (columnKey) {
			case "nama_reviewer": {
				const reviewer = cellValue ? cellValue : "-";
				return reviewer;
			}

			case "aksi":
				return <ModalEvaluation token={token} assesmentKey={history.key} />;

			default:
				return cellValue;
		}
	};

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
