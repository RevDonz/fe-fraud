"use client";

import { Button, Chip } from "@nextui-org/react";
import Link from "next/link";

export type FraudHistoryType = {
	id_institution: string;
	id_admin: string;
	id_reviewer: string;
	tanggal: string;
	hasil: number;
	selesai: true;
	key: string;
	nama_admin: string;
	nama_reviewer: string;
	id: string;
};

export const columns = [
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
		label: "TANGGAL PEMBUATAN",
	},
	{
		key: "status",
		label: "STATUS",
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

export const renderCellFraudHistory = (
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

		case "status": {
			const status = history.selesai ? "Selesai" : "Belum Selesai";
			return (
				<Chip
					color={history.selesai ? "success" : "warning"}
					variant="flat"
					radius="sm"
				>
					{status}
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
