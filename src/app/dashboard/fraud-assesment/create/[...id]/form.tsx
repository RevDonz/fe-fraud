"use client";
import type { SubBab } from "@/constant/assesment";
import { assesmentSchema } from "@/schema/fraud/assesment";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Divider, Radio, RadioGroup } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
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
	} = useForm<z.infer<typeof assesmentSchema>>({
		resolver: zodResolver(assesmentSchema),
	});
	const router = useRouter();

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
							method: "POST",
							body:
								typeof assesment.file !== "undefined" ? formData : undefined,
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
			router.push("/dashboard/fraud-assesment/create");
			toast.dismiss();
			toast.success("Berhasil");
		},
		onError(error) {
			toast.dismiss();
			toast.error("Gagal submit assesment!");
			console.log("Error submit", error.message);
		},
	});

	const onSubmit = async (values: z.infer<typeof assesmentSchema>) => {
		mutation.mutate(values);
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
								<div className="flex justify-between items-center">
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
								</div>

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
										if (e.target.files && e.target.files.length > 0) {
											onChange({
												target: { value: e.target.files[0], name: name },
											});
										}
									}}
									className="border file:hidden px-2 py-1 rounded-md text-sm"
								/>
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
