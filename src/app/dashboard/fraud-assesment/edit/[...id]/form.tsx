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
		setValue,
		getValues,
		formState: { errors },
	} = useForm<z.infer<typeof assesmentSchema>>({
		resolver: zodResolver(assesmentSchema),
	});
	const router = useRouter();
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationKey: ["submit-assesment"],
		mutationFn: async (values: z.infer<typeof assesmentSchema>) => {
			const formData = new FormData();
			const promises = values.assesment.map(async (assesment) => {
				try {
					if (typeof assesment.file !== "undefined") {
						formData.append("file", assesment.file);
					}
					const response = await fetch(
						`${process.env.NEXT_PUBLIC_BASE_URL}/api/point?bab=${assesment.bab}&sub_bab=${assesment.sub_bab}&point=${assesment.point}&answer=${assesment.answer}`,
						{
							method: "PATCH",
							body:
								assesment.file !== undefined && assesment.file !== null
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
						return result.data;
					}
				} catch (error) {
					throw new Error("error");
				}
			});
			return Promise.all(promises);
		},
		onMutate() {
			toast.loading("Loading...");
		},
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ["current-subbab-assesment"] });
			router.push("/dashboard/fraud-assesment/create");
			toast.dismiss();
			toast.success("Berhasil");
		},
		onError(error) {
			toast.dismiss();
			toast.success("Gagal submit assesment!");
			console.log("Error submit", error);
		},
	});

	const onSubmit = async (values: z.infer<typeof assesmentSchema>) => {
		mutation.mutate(values);
		// console.log(values);
	};

	const { data, isLoading } = useQuery({
		queryKey: ["current-subbab-assesment", sub],
		queryFn: async () => {
			const data = await getAssesmentSubBab(token, sub.toString());
			return data;
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
									{isLoading ? (
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
												value="2"
												{...register(`assesment.${index}.answer`)}
											>
												Ada, belum lengkap
											</Radio>
											<Radio
												type="radio"
												value="3"
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
								{data?.[index].proof !== null && getValues(name) !== null ? (
									<div className="flex items-end gap-3 w-full justify-between">
										<div className="flex flex-col gap-3">
											<p>Upload bukti</p>
											<Link
												size="sm"
												href={`http://devta-1-j8022502.deta.app/api/actualfile/${data?.[index].proof?.file_name}`}
												target="_blank"
											>
												{data?.[index].proof?.file_name}
											</Link>
										</div>
										<Button
											isIconOnly
											color="danger"
											size="sm"
											onClick={() => {
												setValue(name, null, {
													shouldValidate: true,
													shouldDirty: true,
												});
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
												if (e.target.files && e.target.files.length > 0) {
													onChange({
														target: { value: e.target.files[0], name: name },
													});
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
			<div className="flex justify-between items-center mt-5">
				<Button
					color="primary"
					variant="solid"
					type="submit"
					isLoading={mutation.isPending}
				>
					Submit
				</Button>
			</div>
		</form>
	);
}
