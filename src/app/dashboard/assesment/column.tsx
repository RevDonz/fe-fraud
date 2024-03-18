"use client";
import { Button, Chip } from "@nextui-org/react";

export type FraudHistoryType = {
	id: string;
	pengisi: string;
	reviewer: string;
	tanggal: string;
	hasil: number;
};

export const FraudHistory: FraudHistoryType[] = [
	{
		id: "1",
		pengisi: "PT Kembang Api",
		reviewer: "Hazim",
		tanggal: new Date().toLocaleDateString(),
		hasil: 90,
	},
	{
		id: "2",
		pengisi: "PT Rumput Bergoyang",
		reviewer: "hazim",
		tanggal: new Date().toLocaleDateString(),
		hasil: 74,
	},
	{
		id: "1",
		pengisi: "PT Sendal Capit",
		reviewer: "hazim",
		tanggal: new Date().toLocaleDateString(),
		hasil: 55,
	},
	{
		id: "1",
		pengisi: "PT Kembang Api",
		reviewer: "Hazim",
		tanggal: new Date().toLocaleDateString(),
		hasil: 90,
	},
	{
		id: "2",
		pengisi: "PT Rumput Bergoyang",
		reviewer: "hazim",
		tanggal: new Date().toLocaleDateString(),
		hasil: 74,
	},
	{
		id: "1",
		pengisi: "PT Sendal Capit",
		reviewer: "hazim",
		tanggal: new Date().toLocaleDateString(),
		hasil: 55,
	},
];

export const columns = [
	{
		key: "pengisi",
		label: "PENGISI ASSESMENT",
	},
	{
		key: "reviewer",
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

		// case "tanggal":
		// 	return format(cellValue, "dd MMMM yyyy, HH:mm");

		case "aksi":
			return (
				<Button color="primary" size="sm">
					Lihat Detail
				</Button>
			);

		default:
			return cellValue;
	}
};
