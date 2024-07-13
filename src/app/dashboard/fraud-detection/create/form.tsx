"use client";
import { DataTableRow, FinancialRatiosIndexes } from "@/constant/detection";
import { getEntity } from "@/lib/entity";
import { cn } from "@/lib/utils";
import { detectionSchema, uploadFileSchema } from "@/schema/fraud/detection";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Button,
	Checkbox,
	Divider,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
type FraudDetectionType = z.infer<typeof detectionSchema>;
type UploadFileType = z.infer<typeof uploadFileSchema>;

export default function FormDetection({ token }: { token: string }) {
	const [isSelected, setIsSelected] = useState(false);
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

	const { data } = useQuery({
		queryKey: ["entity-fraud-detection"],
		queryFn: async () => {
			const data = await getEntity(token);
			return data;
		},
	});

	const { register, getValues } = useForm<z.infer<typeof uploadFileSchema>>({
		resolver: zodResolver(uploadFileSchema),
	});

	const {
		handleSubmit,
		control,
		formState: { errors },
		setValue,
	} = useForm<z.infer<typeof detectionSchema>>({
		resolver: zodResolver(detectionSchema),
	});

	const { isPending: isUploadPending, mutate: mutateUploadFile } = useMutation({
		mutationKey: ["upliad-file-detection"],
		mutationFn: async (values: z.infer<typeof uploadFileSchema>) => {
			const formData = new FormData();
			formData.append("file", values.file);

			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/api/excel`,
				{
					method: "POST",
					body: typeof values.file !== "undefined" ? formData : undefined,
					headers: { Authorization: `Bearer ${token}` },
				},
			);
			const result = await response.json();

			if (result.success) {
				for (const key in result.data) {
					if (Object.prototype.hasOwnProperty.call(result.data, key)) {
						setValue(
							key as keyof z.infer<typeof detectionSchema>,
							result.data[key],
						);
					}
				}

				onClose();
			}
		},
	});

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

	const { onChange, name } = register("file");

	return (
		<div>
			<p className="text-xl font-medium py-5">{data?.name}</p>
			<Divider />
			<div className="flex flex-col gap-5 py-5">
				<p className="font-medium">Upload Laporan Keuangan</p>

				<div className="flex gap-3">
					<input
						placeholder="Enter your username"
						type="file"
						accept=".xlsx"
						className="file:hidden px-3 py-2 rounded-xl text-sm border-2 hover:border-gray-400"
						onChange={(e) => {
							if (e.target.files && e.target.files.length > 0) {
								const file = e.target.files?.[0];
								onChange({
									target: { value: file, name: name },
								});
							}
						}}
					/>
					<Button color="primary" onClick={onOpen} type="button">
						Upload
					</Button>
				</div>
				<Modal
					isOpen={isOpen}
					onOpenChange={onOpenChange}
					hideCloseButton
					size="xl"
					backdrop="blur"
				>
					<ModalContent>
						<ModalHeader className="flex flex-col gap-1">
							Perhatian!
						</ModalHeader>
						<ModalBody>
							<p>
								Sebelum melanjutkan, pastikan file yang akan Anda unggah sudah
								benar, dan sesuai dengan format file yang sudah di sediakan.
								Jika belum sesuai, silahkan untuk unggah file yang sudah di
								sesuaikan.
							</p>
						</ModalBody>
						<ModalFooter>
							<Button
								color="danger"
								variant="light"
								onPress={onClose}
								type="button"
							>
								Batal
							</Button>
							<Button
								color="primary"
								type="button"
								onClick={() =>
									mutateUploadFile({
										file: getValues("file"),
									})
								}
							>
								Unggah File
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
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
										maxLength={4}
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
										maxLength={4}
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
										name={`${row.name}_2` as keyof FraudDetectionType}
										control={control}
										render={({ field }) => (
											<CurrencyInput
												className={cn(
													"px-3 py-2 w-full focus:outline-none text-right",
													errors[`${row.name}_2` as keyof FraudDetectionType] &&
														"placeholder:text-danger",
												)}
												allowNegativeValue={false}
												value={(field.value as unknown as number) || ""}
												onValueChange={(value) => {
													field.onChange(Number(value));
												}}
												placeholder={
													errors[`${row.name}_2` as keyof FraudDetectionType] &&
													`${`${row.label}` as keyof FraudDetectionType} Belum diisi`
												}
											/>
										)}
									/>
								</div>
								<div className="border-r">
									<Controller
										name={`${row.name}_1` as keyof FraudDetectionType}
										control={control}
										render={({ field }) => (
											<CurrencyInput
												className={cn(
													"px-3 py-2 w-full focus:outline-none text-right",
													errors[`${row.name}_1` as keyof FraudDetectionType] &&
														"placeholder:text-danger",
												)}
												value={(field.value as unknown as number) || ""}
												allowNegativeValue={false}
												onValueChange={(value) => {
													field.onChange(Number(value));
												}}
												placeholder={
													errors[`${row.name}_1` as keyof FraudDetectionType] &&
													`${`${row.label}` as keyof FraudDetectionType} Belum diisi`
												}
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
