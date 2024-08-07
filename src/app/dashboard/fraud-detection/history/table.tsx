"use client";

import Datatable from "@/components/datatable";
import { getDetectionHistory } from "@/lib/detection";
import { cn, formatTanggal } from "@/lib/utils";
import type { FraudDetectionType } from "@/types/detection";
import { Button } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function DetectionTable({ token }: { token: string }) {
	const { data, isPending } = useQuery({
		queryKey: ["fraud-detection-history"],
		queryFn: async () => {
			const data = await getDetectionHistory(token);
			return data;
		},
	});

	const columns = [
		{
			key: "data_key",
			label: "ID",
			sortable: false,
		},
		{
			key: "full_name",
			label: "NAMA AUDITOR",
			sortable: true,
		},
		{
			key: "desc",
			label: "DESKRIPSI",
			sortable: true,
		},
		{
			key: "tanggal",
			label: "TANGGAL & WAKTU",
			sortable: true,
		},
		{
			key: "beneish_m",
			label: "BENEISH M SCORE",
			sortable: true,
		},
	];

	const renderDataDetection = (
		history: FraudDetectionType,
		columnKey: React.Key,
	) => {
		const cellValue = history[columnKey as keyof FraudDetectionType];
		const isFraud = history.beneish_m > -2.22;

		switch (columnKey) {
			case "desc":
				return (
					<div className="flex flex-col gap-3">
						<p>Laporan Keuangan {history.tahun_1}</p>
						<p>Laporan Keuangan {history.tahun_2}</p>
						<p className={cn(isFraud ? "text-danger" : "text-success")}>
							{isFraud
								? "Kemungkinan ada manipulasi"
								: "Kemungkinan tidak ada manipulasi"}
						</p>
					</div>
				);

			case "tanggal": {
				return <p>{formatTanggal(cellValue as string)}</p>;
			}

			case "beneish_m": {
				return (
					<div className="flex flex-col gap-3 justify-center items-start">
						<Button
							size="sm"
							color={isFraud ? "danger" : "success"}
							className="text-danger-foreground"
						>
							{cellValue}
						</Button>
						<Button
							color="primary"
							size="sm"
							as={Link}
							href={`/dashboard/fraud-detection/detail/${history.data_key}`}
						>
							Lihat Detail
						</Button>
					</div>
				);
			}

			default:
				return cellValue;
		}
	};

	return (
		<Datatable
			data={data ?? []}
			columns={columns}
			renderCell={renderDataDetection}
			isLoading={isPending}
			label="Table Data Staff"
			rowPage={5}
			// filterOptions={[
			// 	{
			// 		column: "role",
			// 		label: "Role",
			// 		options: [
			// 			{ name: "Admin", uid: "admin" },
			// 			{ name: "Staff", uid: "staff" },
			// 			{ name: "Reviewer", uid: "reviewer" },
			// 		],
			// 	},
			// 	{
			// 		column: "event",
			// 		label: "Aktivitas",
			// 		options: [
			// 			{ name: "Logged In", uid: "Logged In" },
			// 			{ name: "Submit Point", uid: "Submit Point" },
			// 			{ name: "Submitted Assessment", uid: "Submitted Assessment" },
			// 		],
			// 	},
			// ]}
		/>
	);
}
