"use client";

import { Button, Chip } from "@nextui-org/react";
import Link from "next/link";

export type FraudHistoryType = {
	id: string;
	id_institution: string;
	id_admin: string;
	id_reviewer_internal: string;
	id_reviewer_external: string;
	tanggal: string;
	hasil_internal: number;
	hasil_external: number;
	selesai: boolean;
	key: string;
	admin: string;
	reviewer_internal: string;
	reviewer_external: string;
};

export const columns = [
	{
		key: "key",
		label: "ID ASSESMENT",
	},
	{
		key: "admin",
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
		key: "hasil_internal",
		label: "HASIL INTERNAL",
	},
	{
		key: "hasil_external",
		label: "HASIL EXTERNAL",
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

		case "hasil_internal": {
			// const hasil = cellValue !== 0 ? cellValue : "Belum dinilai";
			return (
				<Chip
					color="primary"
					variant={cellValue === 0 ? "bordered" : "flat"}
					radius="sm"
				>
					{cellValue === 0 ? "Belum dinilai" : cellValue}
				</Chip>
			);
		}

		case "hasil_external": {
			// const hasil = cellValue !== 0 ? cellValue : "Belum dinilai";
			return (
				<Chip
					color="primary"
					variant={cellValue === 0 ? "bordered" : "flat"}
					radius="sm"
				>
					{cellValue === 0 ? "Belum dinilai" : cellValue}
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
					href={`/dashboard/fraud-assesment/detail/${history.key}`}
					isDisabled={!history.selesai}
				>
					Lihat Detail
				</Button>
			);

		default:
			return cellValue;
	}
};
