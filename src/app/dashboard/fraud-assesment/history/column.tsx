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

export const renderCellFraudHistory = (
	history: FraudHistoryType,
	columnKey: React.Key,
) => {
	const cellValue = history[columnKey as keyof FraudHistoryType];

	switch (columnKey) {
		case "hasil":
			return (
				<Chip
					color={
						history.hasil >= 75
							? "success"
							: history.hasil >= 60
								? "warning"
								: "danger"
					}
					radius="sm"
					className="text-white"
				>
					{`${
						history.hasil >= 75
							? "Good"
							: history.hasil >= 60
								? "Normal"
								: "Bad"
					} / ${history.hasil}`}
				</Chip>
			);

		case "aksi":
			return (
				<Link href={`/dashboard/fraud-assesment/${history.key}/detail`}>
					<Button color="primary" size="sm">
						Lihat Detail
					</Button>
				</Link>
			);

		default:
			return cellValue;
	}
};
