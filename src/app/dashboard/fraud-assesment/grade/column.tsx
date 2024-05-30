"use client";

import type { FraudHistoryType } from "@/types/assesment";
import { Button, Chip } from "@nextui-org/react";
import Link from "next/link";

export const columnsAssessed = [
	{
		key: "nama_admin",
		label: "PENGISI ASSESMENT",
	},
	{
		key: "nama_reviewer",
		label: "REVIEWER",
	},
	{
		key: "tanggal",
		label: "TANGGAL PENILAIAN",
	},
	{
		key: "hasil",
		label: "HASIL",
	},
	{
		key: "aksi",
		label: "AKSI",
	},
];

export const columnsNotAssessed = [
	{
		key: "nama_admin",
		label: "PENGISI ASSESMENT",
	},
	{
		key: "tanggal",
		label: "TANGGAL PENGISIAN",
	},
	{
		key: "aksi",
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

		case "hasil": {
			const hasil = cellValue !== 0 ? cellValue : "Belum dinilai";
			return (
				<Chip color="primary" variant="bordered" radius="sm">
					{hasil}
				</Chip>
			);
		}

		case "aksi":
			return (
				<Button
					color="primary"
					size="sm"
					as={Link}
					href={`/dashboard/fraud-assesment/${history.id}/detail`}
					isDisabled={!history.selesai}
				>
					Lihat Detail
				</Button>
			);

		default:
			return cellValue;
	}
};

export const renderCellNotAssessed = (
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
			return (
				<Button
					color="primary"
					size="sm"
					as={Link}
					href={`/dashboard/fraud-assesment/${history.id}/detail`}
				>
					Beri Nilai
				</Button>
			);

		default:
			return cellValue;
	}
};
