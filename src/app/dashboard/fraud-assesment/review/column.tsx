"use client";

import type { FraudHistoryType } from "@/types/assesment";
import { Button, Chip } from "@nextui-org/react";
import Link from "next/link";

export const columnsAssessed = [
	{
		key: "admin",
		sortable: false,
		label: "PENGISI ASSESMENT",
	},
	{
		key: "reviewer_internal",
		sortable: false,
		label: "REVIEWER",
	},
	{
		key: "tanggal",
		sortable: false,
		label: "TANGGAL PENILAIAN",
	},
	{
		key: "status",
		sortable: false,
		label: "STATUS",
	},
	{
		key: "hasil_internal",
		sortable: false,
		label: "HASIL INTERNAL",
	},
	{
		key: "aksi",
		sortable: false,
		label: "AKSI",
	},
];

export const columnsNotAssessed = [
	{
		key: "admin",
		sortable: false,
		label: "PENGISI ASSESMENT",
	},
	{
		key: "tanggal",
		sortable: false,
		label: "TANGGAL PENGISIAN",
	},
	{
		key: "aksi",
		sortable: false,
		label: "AKSI",
	},
];

export const renderCellHasAssessed = (
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

		case "status": {
			const status =
				history.id_reviewer_external !== null && history.hasil_internal !== 0;
			return (
				<Chip color={status ? "success" : "warning"} variant="flat" radius="sm">
					{status ? "Sudah Selesai" : "Belum Selesai"}
				</Chip>
			);
		}

		case "aksi": {
			const status =
				history.id_reviewer_external !== null && history.hasil_internal !== 0;

			return (
				<Button
					color={status ? "primary" : "warning"}
					size="sm"
					variant={status ? "solid" : "flat"}
					as={Link}
					href={`/dashboard/fraud-assesment/review/${history.key}`}
					isDisabled={!history.selesai}
				>
					{status ? "Lihat Detail" : "Lanjut Penilaian"}
				</Button>
			);
		}

		default:
			return cellValue;
	}
};