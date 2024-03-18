import { Button, Chip } from "@nextui-org/react";
import { useCallback } from "react";

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

