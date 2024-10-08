"use client";
import type { SubBab } from "@/constant/assesment";
import { getAssesmentSubBab } from "@/lib/assesment";
import { assesmentSchema } from "@/schema/fraud/assesment";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Button,
	Divider,
	Link,
	Radio,
	RadioGroup,
	Skeleton,
} from "@nextui-org/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

export default function EditAssesmentForm({
	subTitle,
	bab,
	sub,
	token,
}: { subTitle: SubBab; bab: number; sub: number; token: string }) {
	const {
		handleSubmit,
		register,
		getValues,
		setError,
		formState: { errors },
	} = useForm<z.infer<typeof assesmentSchema>>({
		resolver: zodResolver(assesmentSchema),
	});
	const router = useRouter();
	const queryClient = useQueryClient();
	const [fileErrors, setFileErrors] = useState<string[]>([]);

	const mutation = useMutation({
		mutationKey: ["submit-assesment"],
		mutationFn: async (values: z.infer<typeof assesmentSchema>) => {
			try {
				const formData = new FormData();
				const results = [];

				for (let i = 0; i < values.assesment.length; i++) {
					const assessment = values.assesment[i];

					if (typeof assessment.file !== "undefined") {
						formData.append("file", assessment.file);
					}

					const response = await fetch(
						`${process.env.NEXT_PUBLIC_BASE_URL}/api/point?bab=${assessment.bab}&sub_bab=${assessment.sub_bab}&point=${assessment.point}&answer=${assessment.answer}`,
						{
							method: "PATCH",
							body:
								assessment.file !== undefined && assessment.file !== null
									? formData
									: null,
							headers: { Authorization: `Bearer ${token}` },
						},
					);

					if (!response.ok) {
						throw new Error("Failed to submit data");
					}

					const result = await response.json();

					if (result.success) {
						results.push(result.data);
					} else {
						throw new Error("Failed to submit data");
					}
				}

				return results;
			} catch (error) {
				throw new Error("Error during mutation");
			}
		},
		onMutate() {
			toast.loading("Menyimpan jawaban, mohon tunggu sebentar...");
		},
		onSuccess(data) {
			toast.dismiss();
			toast.success("Berhasil");
			queryClient.invalidateQueries({ queryKey: ["current-subbab-assesment"] });
			router.push("/dashboard/fraud-assesment/create");
		},
		onError(error) {
			toast.dismiss();
			toast.error("Gagal submit assesment!");
			console.error("Error submit", error);
		},
	});

	const onSubmit = async (values: z.infer<typeof assesmentSchema>) => {
		if (fileErrors.length > 0) {
			return toast.error("Periksa kembali file yang diunggah.");
		}
		mutation.mutate(values);
	};

	const { data, isPending } = useQuery({
		queryKey: ["current-subbab-assesment", sub],
		queryFn: async () => {
			const data = await getAssesmentSubBab(token, sub.toString());
			return data;
		},
	});

	const mutationDelete = useMutation({
		mutationFn: async (filename: string) => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_BASE_URL}/file/${filename}`,
					{
						method: "DELETE",
						headers: { Authorization: `Bearer ${token}` },
					},
				);

				const result = await response.json();

				return result.success;
			} catch (error) {
				console.log(error);
			}
		},
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ["current-subbab-assesment", sub],
			});
			toast.success("File berhasil dihapus!");
		},
		onError() {
			queryClient.invalidateQueries({
				queryKey: ["current-subbab-assesment", sub],
			});
			toast.error("File gagal dihapus!");
		},
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{subTitle?.questions?.map((questions, index) => {
				const { onChange, name } = register(`assesment.${index}.file`);

				return (
					<div key={`${index * 2}`}>
						<input
							type="text"
							className="hidden"
							defaultValue={bab}
							{...register(`assesment.${index}.bab`)}
						/>
						<input
							type="text"
							className="hidden"
							defaultValue={sub}
							{...register(`assesment.${index}.sub_bab`)}
						/>
						<input
							type="text"
							className="hidden"
							defaultValue={index + 1}
							{...register(`assesment.${index}.point`)}
						/>
						<div className="flex w-full justify-between my-3 items-center">
							<div className="flex flex-col gap-3 w-3/4">
								<p>
									{index + 1}. {questions.title}
								</p>
								<div className="flex justify-between items-center">
									{isPending ? (
										<Skeleton className="h-4 w-full rounded-md" />
									) : (
										<RadioGroup
											orientation="horizontal"
											defaultValue={data?.[index].answer.toString()}
											{...register(`assesment.${index}.answer`)}
										>
											<Radio
												type="radio"
												value="1"
												{...register(`assesment.${index}.answer`)}
											>
												Ada, dan sudah lengkap
											</Radio>
											<Radio
												type="radio"
												value="0.5"
												{...register(`assesment.${index}.answer`)}
											>
												Ada, belum lengkap
											</Radio>
											<Radio
												type="radio"
												value="0"
												{...register(`assesment.${index}.answer`)}
											>
												Belum ada
											</Radio>
										</RadioGroup>
									)}
								</div>

								{errors.assesment?.[index]?.answer?.message ? (
									<p className="text-sm text-danger">
										{errors.assesment?.[index]?.answer?.message}
									</p>
								) : (
									""
								)}
							</div>
							<div className="flex flex-row gap-3 justify-end items-center w-1/4">
								{data?.[index].id_proof !== null && getValues(name) !== null ? (
									<div className="flex items-end gap-3 w-full justify-between">
										<div className="flex flex-col gap-3">
											<p>Upload bukti</p>
											<Link
												size="sm"
												href={`${process.env.NEXT_PUBLIC_BASE_URL}/api/actualfile/${data?.[index].id_proof?.file_name}`}
												target="_blank"
											>
												{data?.[index].id_proof?.file_name}
											</Link>
										</div>
										<Button
											isIconOnly
											color="danger"
											size="sm"
											onClick={async () => {
												mutationDelete.mutate(
													data?.[index].id_proof?.file_name as string,
												);
											}}
										>
											<Trash2 className="w-4 h-4" />
										</Button>
									</div>
								) : (
									<div className="flex flex-col gap-3 w-full">
										<p>Upload bukti</p>
										<input
											type="file"
											accept=".pdf"
											onChange={(e) => {
												const file = e.target.files?.[0];
												if (file) {
													if (file.size > 1 * 1024 * 1024) {
														setError(`assesment.${index}.file`, {
															type: "manual",
															message: "File tidak boleh lebih dari 1MB",
														});
														setFileErrors((prev) => [
															...prev,
															`assesment.${index}.file`,
														]);
													} else {
														setFileErrors((prev) =>
															prev.filter(
																(err) => err !== `assesment.${index}.file`,
															),
														);
														onChange({ target: { value: file, name: name } });
													}
												}
											}}
											className="border file:hidden px-2 py-1 rounded-md text-sm"
										/>
									</div>
								)}
							</div>
						</div>
						<Divider />
					</div>
				);
			})}
			<div className="flex justify-end items-center mt-5">
				<Button
					color="primary"
					variant="solid"
					type="submit"
					isLoading={mutation.isPending}
				>
					Simpan
				</Button>
			</div>
		</form>
	);
}
