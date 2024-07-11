"use client";
import { DataTableRow, FinancialRatiosIndexes } from "@/constant/detection";
import { getEntity } from "@/lib/entity";
import { cn } from "@/lib/utils";
import { detectionSchema } from "@/schema/fraud/detection";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, Divider } from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

export default function FormDetection({ token }: { token: string }) {
	const { data, isPending } = useQuery({
		queryKey: ["entity-fraud-detection"],
		queryFn: async () => {
			const data = await getEntity(token);
			return data;
		},
	});
	const [isSelected, setIsSelected] = useState(false);

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<z.infer<typeof detectionSchema>>({
		resolver: zodResolver(detectionSchema),
		// defaultValues: {
		// 	revenue_1: undefined,
		// 	cogs_1: undefined,
		// 	sgae_1: undefined,
		// 	depreciation_1: undefined,
		// 	net_continuous_1: undefined,
		// 	account_receivables_1: undefined,
		// 	current_assets_1: undefined,
		// 	ppe_1: undefined,
		// 	securities_1: undefined,
		// 	total_asset_1: undefined,
		// 	current_liabilities_1: undefined,
		// 	total_ltd_1: undefined,
		// 	cash_flow_operate_1: undefined,
		// 	revenue_2: undefined,
		// 	cogs_2: undefined,
		// 	sgae_2: undefined,
		// 	depreciation_2: undefined,
		// 	net_continuous_2: undefined,
		// 	account_receivables_2: undefined,
		// 	current_assets_2: undefined,
		// 	ppe_2: undefined,
		// 	securities_2: undefined,
		// 	total_asset_2: undefined,
		// 	current_liabilities_2: undefined,
		// 	total_ltd_2: undefined,
		// 	cash_flow_operate_2: undefined,
		// 	tahun_1: 2012,
		// 	tahun_2: 2013,
		// 	id_institution: "gc8uupscjs0e",
		// },
		defaultValues: {
			revenue_1: 2824529865,
			cogs_1: 1637778233,
			sgae_1: 978404721,
			depreciation_1: 145556996,
			net_continuous_1: 48164343,
			account_receivables_1: 153909929,
			current_assets_1: 955934379,
			ppe_1: 1520837177,
			securities_1: 11703633,
			total_asset_1: 2085215,
			current_liabilities_1: 919187828,
			total_ltd_1: 602268672,
			cash_flow_operate_1: 292733763,
			revenue_2: 3698268848,
			cogs_2: 2017661985,
			sgae_2: 1286510421,
			depreciation_2: 199692257,
			net_continuous_2: 159960247,
			account_receivables_2: 211364131,
			current_assets_2: 1192611390,
			ppe_2: 1520837177,
			securities_2: 14959054,
			total_asset_2: 2582866504,
			current_liabilities_2: 1086055919,
			total_ltd_2: 631821538,
			cash_flow_operate_2: 487884312,
			tahun_1: 2012,
			tahun_2: 2013,
			id_institution: "gc8uupscjs0e",
		},
	});

	type FraudDetectionType = z.infer<typeof detectionSchema>;

	const {
		mutate,
		data: dataDetection,
		isSuccess,
	} = useMutation({
		mutationKey: ["submit-assesment"],
		mutationFn: async (values: z.infer<typeof detectionSchema>) => {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/report`,
				{
					method: "POST",
					body: JSON.stringify(values),
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				},
			);

			if (!response.ok) {
				throw new Error("Failed to submit data");
			}

			const result = await response.json();
			return result;
		},

		onMutate() {
			toast.loading("Loading...");
		},
		onSuccess(data) {
			toast.dismiss();
			toast.success("Berhasil");
			console.log(data);
		},
		onError(error) {
			toast.dismiss();
			toast.error("Gagal submit assesment!");
			console.log("Error submit", error.message);
		},
	});

	const onSubmit = async (values: z.infer<typeof detectionSchema>) => {
		mutate(values);
	};

	return (
		<div>
			<p className="text-xl font-medium py-5">{data?.name}</p>
			<Divider />
			<div className="flex flex-col gap-5 py-5">
				<p className="font-medium">Upload Laporan Keuangan</p>
				<div className="">
					<input
						placeholder="Enter your username"
						type="file"
						accept=".pdf"
						className="file:hidden px-3 py-2 rounded-xl text-sm border-2 hover:border-gray-400"
						onChange={(e) => {
							if (e.target.files && e.target.files.length > 0) {
								console.log(e.target.files[0]);
							}
						}}
					/>
				</div>
			</div>
			<Divider />

			<form onSubmit={handleSubmit(onSubmit)}>
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
							<Controller
								name={"tahun_2"}
								control={control}
								render={({ field }) => (
									<input
										className={cn(
											"px-3 py-2 bg-transparent focus:outline-none text-right w-full text-base",
											errors.tahun_2 && "placeholder:text-danger",
										)}
										placeholder="Masukkan tahun ke-2"
										{...field}
									/>
								)}
							/>
						</div>
						<div className="bg-default-100 px-3 py-2 text-sm font-medium text-foreground-500 rounded-tr-lg">
							<Controller
								name={"tahun_1"}
								control={control}
								render={({ field }) => (
									<input
										className={cn(
											"px-3 py-2 bg-transparent focus:outline-none text-right w-full text-base",
											errors.tahun_1 && "placeholder:text-danger",
										)}
										placeholder="Masukkan tahun ke-1"
										{...field}
									/>
								)}
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
									<Controller
										name={`${row.name}_1` as keyof FraudDetectionType}
										control={control}
										render={({ field }) => (
											<CurrencyInput
												className="px-3 py-2 w-full focus:outline-none text-right"
												value={field.value}
												allowNegativeValue={false}
												onValueChange={(value) => {
													field.onChange(Number(value));
												}}
											/>
										)}
									/>
								</div>
								<div className="">
									<Controller
										name={`${row.name}_2` as keyof FraudDetectionType}
										control={control}
										render={({ field }) => (
											<CurrencyInput
												className="px-3 py-2 w-full focus:outline-none text-right"
												allowNegativeValue={false}
												value={field.value}
												onValueChange={(value) => {
													field.onChange(Number(value));
												}}
											/>
										)}
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
										value={dataDetection?.data?.[row.key]}
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
								dataDetection?.data?.beneish_m < -2.22
									? "bg-green-500"
									: dataDetection?.data?.beneish_m > -2.22
										? "bg-danger"
										: "bg-default-100",
							)}
						>
							{dataDetection?.data?.beneish_m}
						</div>
					</div>
				</div>
				{isSuccess ? (
					<div className="flex flex-col my-5 gap-5">
						<div className="flex gap-3 items-center">
							<p>Hasil:</p>
							<Button
								size="sm"
								color={
									dataDetection?.data?.beneish_m < -2.22 ? "success" : "danger"
								}
								className="text-white"
							>
								{dataDetection?.data?.beneish_m < -2.22
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
				) : (
					<div className="flex flex-col mt-5 gap-5">
						<p className="text-danger text-justify">
							Dengan ini menyatakan bahwa saya telah mengisi assesment ini
							dengan itikad baik dan sepenuh hati. Saya berkomitmen untuk
							memberikan jawaban yang sejelas dan seakurat mungkin, tanpa
							menggunakan bantuan pihak lain atau materi yang tidak diizinkan.
							Kejujuran saya dalam mengisi laporan ini adalah landasan untuk
							pengembangan diri saya.
						</p>
						<div className="flex flex-row items-center justify-between">
							<Checkbox isSelected={isSelected} onValueChange={setIsSelected}>
								Saya setuju dengan pernyataan diatas
							</Checkbox>
							<Button
								color="success"
								className="text-white"
								isDisabled={!isSelected}
								type="submit"
							>
								Submit
							</Button>
						</div>
					</div>
				)}
			</form>
		</div>
	);
}
