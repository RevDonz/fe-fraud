"use client";
import Datatable from "@/components/datatable";
import { getAssesmentHistory } from "@/lib/assesment";
import { getEntity } from "@/lib/entity";
import { compareDates } from "@/lib/utils";
import type { FraudHistoryType } from "@/types/assesment";
import { Chip, Tab, Tabs } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import {
	columnsAssessed,
	columnsNotAssessed,
	columnsNotAssessedExternal,
	renderCellHasAssessed,
} from "./column";
import ModalEvaluation from "./modal-fraud-evaluation";

const TableGrade = ({ token }: { token: string }) => {
	const { data: entity } = useQuery({
		queryKey: ["entity-fraud-detection"],
		queryFn: async () => {
			const data = await getEntity(token);
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

	const sortedDataAssessed = dataAssessed
		?.sort(compareDates)
		.filter((data) => data.id_reviewer_internal !== "" && data.is_done);

	const sortedDataNotAssessed = dataAssessed
		?.sort(compareDates)
		.filter((data) => data.id_reviewer_internal === "" && data.is_done);

	const sortedDataAssessedExternal = dataAssessed
		?.sort(compareDates)
		.filter(
			(data) =>
				data.hasil_external !== null && data.id_reviewer_external !== null,
		);

	const sortedDataNotAssessedExternal = dataAssessed
		?.sort(compareDates)
		.filter(
			(data) =>
				data.id_reviewer_external === "" && data.hasil_internal !== null,
		);

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

			case "hasil_internal": {
				return (
					<div className="w-full">
						<Chip
							color={
								cellValue === null
									? "primary"
									: Number(cellValue) > 75
										? "success"
										: Number(cellValue) > 50
											? "warning"
											: "danger"
							}
							variant={cellValue === null ? "bordered" : "flat"}
							radius="sm"
						>
							<p className="w-24 text-center">
								{cellValue === null
									? "Belum dinilai"
									: Number(cellValue) > 75
										? `Good / ${cellValue}`
										: Number(cellValue) > 50
											? `Normal / ${cellValue}`
											: `Bad / ${cellValue}`}
							</p>
						</Chip>
					</div>
				);
			}

			case "aksi":
				return (
					<ModalEvaluation token={token} assesmentKey={history.data_key} />
				);

			default:
				return cellValue;
		}
	};

	return (
		<Tabs aria-label="Options" color="primary" variant="bordered" size="lg">
			<Tab key="hasAssessed" title="Sudah Di nilai">
				<Datatable
					data={
						entity?.data_key === "external"
							? sortedDataAssessedExternal ?? []
							: sortedDataAssessed ?? []
					}
					columns={columnsAssessed}
					renderCell={renderCellHasAssessed}
					isLoading={isAssessedPending}
					label="Table Fraud Assesment"
				/>
			</Tab>
			<Tab key="notAssessed" title="Belum Di nilai">
				<Datatable
					data={
						entity?.data_key === "external"
							? sortedDataNotAssessedExternal ?? []
							: sortedDataNotAssessed ?? []
					}
					columns={
						entity?.data_key === "external"
							? columnsNotAssessedExternal
							: columnsNotAssessed
					}
					renderCell={renderCellNotAssessed}
					isLoading={isAssessedPending}
					label="Table Fraud Assesment"
				/>
			</Tab>
		</Tabs>
	);
};

export default TableGrade;
