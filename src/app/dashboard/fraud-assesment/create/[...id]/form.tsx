"use client";
import type { SubBab } from "@/constant/assesment";
import { assesmentSchema } from "@/schema/fraud/assesment";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Divider, Radio, RadioGroup } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

export default function CreateAssesmentForm({
	subTitle,
	bab,
	sub,
	token,
}: { subTitle: SubBab; bab: number; sub: number; token: string }) {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setError,
	} = useForm<z.infer<typeof assesmentSchema>>({
		resolver: zodResolver(assesmentSchema),
	});
	const router = useRouter();
	const [fileErrors, setFileErrors] = useState<string[]>([]);

	const mutation = useMutation({
		mutationKey: ["submit-assesment"],
		mutationFn: async (values: z.infer<typeof assesmentSchema>) => {
			try {
				const formData = new FormData();
				const results = [];

				for (let i = 0; i < values.assesment.length; i++) {
					const assesment = values.assesment[i];

					if (typeof assesment.file !== "undefined") {
						formData.append("file", assesment.file);
					}

					const response = await fetch(
						`${process.env.NEXT_PUBLIC_BASE_URL}/api/point?bab=${assesment.bab}&sub_bab=${assesment.sub_bab}&point=${assesment.point}&answer=${Number(assesment.answer)}`,
						{
							method: "POST",
							body:
								typeof assesment.file !== "undefined" ? formData : undefined,
							headers: { Authorization: `Bearer ${token}` },
						},
					);

					const result = await response.json();

					if (result.success) {
						results.push(result.data);
					}
				}

				return results;
			} catch (error) {
				throw new Error("Failed to submit data");
			}
		},
		onMutate() {
			toast.loading("Loading...");
		},
		onSuccess(data) {
			toast.dismiss();
			toast.success("Berhasil");
			router.push("/dashboard/fraud-assesment/create");
		},
		onError(error) {
			toast.dismiss();
			toast.error("Gagal submit assesment!");
			console.log("Error submit", error.message);
		},
	});

	const onSubmit = async (values: z.infer<typeof assesmentSchema>) => {
		if (fileErrors.length > 0) {
			return toast.error("Periksa kembali file yang diunggah.");
		}
		mutation.mutate(values);
		// console.log(values);
	};

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
							<div className="flex flex-col gap-3">
								<p>
									{index + 1}. {questions.title}
								</p>
								<RadioGroup
									orientation="horizontal"
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

								{errors.assesment?.[index]?.answer?.message ? (
									<p className="text-sm text-danger">
										{errors.assesment?.[index]?.answer?.message}
									</p>
								) : (
									""
								)}
							</div>
							<div className="flex flex-col gap-1">
								<p>Upload bukti</p>
								<input
									type="file"
									accept=".pdf"
									onChange={(e) => {
										const file = e.target.files?.[0];
										if (file) {
											if (file.size > 2 * 1024 * 1024) {
												setError(`assesment.${index}.file`, {
													type: "manual",
													message: "File tidak boleh lebih dari 2MB",
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
								{errors.assesment?.[index]?.file?.message ? (
									<p className="text-sm text-danger">
										{errors.assesment?.[index]?.file?.message?.toString() ?? ""}
									</p>
								) : (
									""
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
