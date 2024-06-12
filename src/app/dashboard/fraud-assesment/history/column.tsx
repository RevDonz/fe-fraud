"use client";

import type { FraudHistoryType } from "@/types/assesment";
import { Button, Chip } from "@nextui-org/react";
import Link from "next/link";

export const columns = [
	{
		key: "key",
		label: "ID ASSESMENT",
		sortable: false,
	},
	{
		key: "admin",
		sortable: false,
		label: "PENGISI ASSESMENT",
	},
	{
		key: "nama_reviewer",
		sortable: false,
		label: "REVIEWER",
	},
	{
		key: "tanggal",
		sortable: true,
		label: "TANGGAL PEMBUATAN",
	},
	{
		key: "status",
		sortable: true,
		label: "STATUS",
	},
	{
		key: "hasil_internal",
		sortable: false,
		label: "HASIL INTERNAL",
	},
	{
		key: "hasil_external",
		sortable: false,
		label: "HASIL EXTERNAL",
	},
	{
		key: "aksi",
		sortable: false,
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
							{cellValue === null ? "Belum dinilai" : cellValue}
						</p>
					</Chip>
				</div>
			);
		}

		case "hasil_external": {
			// const hasil = cellValue !== 0 ? cellValue : "Belum dinilai";
			return (
				<Chip
					color="primary"
					variant={cellValue === null ? "bordered" : "flat"}
					radius="sm"
				>
					{cellValue === null ? "Belum dinilai" : cellValue}
				</Chip>
			);
		}

		case "status": {
			const status = history.selesai ? "Sudah Selesai" : "Belum Selesai";
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
