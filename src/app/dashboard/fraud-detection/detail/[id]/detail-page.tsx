"use client";

import { DataTableRow, FinancialRatiosIndexes } from "@/constant/detection";
import { getDetectionByKey } from "@/lib/detection";
import { cn } from "@/lib/utils";
import type { FraudDetectionFull } from "@/types/detection";
import { Button } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import CurrencyInput from "react-currency-input-field";

export default function DetailDetectionPage({
	token,
	detectionKey,
}: { token: string; detectionKey: string }) {
	const { data, isPending } = useQuery({
		queryKey: ["fraud-detection-by-key", detectionKey],
		queryFn: async () => {
			const data = await getDetectionByKey(token, detectionKey);
			return data;
		},
	});

	return (
		<div>
      
			<div className="py-5">
				<div className="grid grid-cols-3 border rounded-tl-lg rounded-tr-lg">
					<div className="bg-default-100 px-3 py-2 text-sm font-medium text-foreground-500 rounded-tl-lg">
						<input
							className="px-3 py-2 bg-transparent focus:outline-none w-full text-base"
							value={"( IN MILLION )"}
							readOnly
						/>
					</div>
					<div className="bg-default-100 px-3 py-2 text-sm font-medium text-foreground-500">
						<input
							className={cn(
								"px-3 py-2 bg-transparent focus:outline-none text-right w-full text-base",
							)}
							placeholder="Masukkan tahun ke-2"
							maxLength={4}
							value={data?.tahun_2}
						/>
					</div>
					<div className="bg-default-100 px-3 py-2 text-sm font-medium text-foreground-500 rounded-tr-lg">
						<input
							className={cn(
								"px-3 py-2 bg-transparent focus:outline-none text-right w-full text-base",
							)}
							placeholder="Masukkan tahun ke-2"
							maxLength={4}
							value={data?.tahun_1}
						/>
					</div>
				</div>
				{DataTableRow.map((row) => {
					return (
						<div
							className="grid grid-cols-3 gap-1 border-x border-b"
							key={row.name}
						>
							<div className="px-3 py-2 border-r">{row.label}</div>
							<div className="border-r">
								<CurrencyInput
									className={cn(
										"px-3 py-2 w-full focus:outline-none text-right",
									)}
									allowNegativeValue={false}
									value={data?.[`${row.name}_1` as keyof FraudDetectionFull]}
								/>
							</div>
							<div className="border-r">
								<CurrencyInput
									className={cn(
										"px-3 py-2 w-full focus:outline-none text-right",
									)}
									allowNegativeValue={false}
									value={data?.[`${row.name}_2` as keyof FraudDetectionFull]}
								/>
							</div>
						</div>
					);
				})}
				<p className="italic mt-3 ml-3">
					Securities is also referred to as total long term investments
				</p>
			</div>
			<div className="py-5">
				<div className="grid grid-cols-4 border rounded-tl-lg rounded-tr-lg">
					<div className="bg-default-100 col-span-3 px-3 py-2 text-sm font-medium text-foreground-500 rounded-tl-lg">
						Financial Ratios Indexes
					</div>
					<div className="bg-default-100 px-3 py-2 text-sm font-medium text-foreground-500 rounded-tr-lg">
						INDEX
					</div>
				</div>
				{FinancialRatiosIndexes.map((row) => {
					return (
						<div
							className="grid grid-cols-4 gap-1 border-x border-b"
							key={row.index}
						>
							<div className="px-3 py-2 border-r col-span-3">{row.index}</div>
							<div>
								<CurrencyInput
									className="px-3 py-2 w-full focus:outline-none"
									value={data?.[`${row.key}` as keyof FraudDetectionFull]}
									readOnly
								/>
							</div>
						</div>
					);
				})}
				<div className="grid grid-cols-4 border-b border-x rounded-bl-lg rounded-br-lg">
					<div className="bg-default-100 px-3 py-2 text-sm font-medium text-foreground-700 rounded-bl-lg col-span-3">
						Beneish M Score
					</div>
					<div
						className={cn(
							"px-3 py-2 text-sm font-medium text-foreground-100 rounded-br-lg",
							data && data?.beneish_m < -2.22
								? "bg-green-500"
								: data && data?.beneish_m > -2.22
									? "bg-danger"
									: "bg-default-100",
						)}
					>
						{data?.beneish_m}
					</div>
				</div>
			</div>
			<div className="flex flex-col my-5 gap-5">
				<div className="flex gap-3 items-center">
					<p>Hasil:</p>
					<Button
						size="sm"
						color={data && data?.beneish_m < -2.22 ? "success" : "danger"}
						className="text-white"
					>
						{data && data?.beneish_m < -2.22
							? "PT. FDP Tidak Terindikasi Kecurangan Pada Laporan Keuangan."
							: "PT. FDP Terindikasi Kecurangan Pada Laporan Keuangan."}
					</Button>
				</div>
				<div className="flex flex-col">
					<p>
						{
							"Skor Beneish M < -2,22: Entitas tidak terindikasi kecurangan pada laporan keuangan."
						}
					</p>
					<p>
						{
							"Skor Beneish M > -2,22: Entitas mungkin telah memanipulasi laporan keuangan."
						}
					</p>
				</div>
			</div>
		</div>
	);
}
