"use client";
import { Questions } from "@/constant/assesment";
import { getAssesmentSubBabByKey } from "@/lib/assesment";
import { reviewAssesmentSchema } from "@/schema/fraud/assesment";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Divider, Link, Select, SelectItem } from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

export default function ReviewAssesmentGrade({
	bab,
	subBab,
	token,
	assesmentKey,
}: { bab: number; subBab: number; token: string; assesmentKey: string }) {
	const router = useRouter();

	const { data, isPending } = useQuery({
		queryKey: ["current-subbab-assesment-key", subBab],
		queryFn: async () => {
			const data = await getAssesmentSubBabByKey(
				token,
				assesmentKey,
				subBab.toString(),
			);
			return data;
		},
	});

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<z.infer<typeof reviewAssesmentSchema>>({
		resolver: zodResolver(reviewAssesmentSchema),
		defaultValues: {
			id_assessment: assesmentKey,
			sub_bab: subBab.toString(),
			skor: [],
		},
	});

	const mutation = useMutation({
		mutationKey: ["submit-assesment"],
		mutationFn: async (values: z.infer<typeof reviewAssesmentSchema>) => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_BASE_URL}/api/assessments/evaluation`,
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

				if (result.success) {
					return result.data;
				}
			} catch (error) {
				throw new Error("error");
			}
		},
		onMutate() {
			toast.loading("Loading...");
		},
		onSuccess() {
			router.push(`/dashboard/fraud-assesment/review/${assesmentKey}`);
			toast.dismiss();
			toast.success("Berhasil");
		},
		onError(error) {
			toast.dismiss();
			toast.error("Gagal submit review!");
			console.log("Error submit", error.message);
		},
	});

	const onSubmit = async (values: z.infer<typeof reviewAssesmentSchema>) => {
		mutation.mutate(values);
	};
	const subTitle = Questions.find((item) => item.bab === bab)?.subtitle.find(
		(sub) => sub.sub_bab === subBab,
	);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{subTitle?.questions?.map((questions, index) => {
				const answer =
					data?.point[index].answer === 1
						? "Ada, dan sudah lengkap"
						: data?.point[index].answer === 0.5
							? "Ada, tidak lengkap"
							: "Tidak ada";
				return (
					<div key={`${index * 2}`}>
						<div className="flex w-full justify-between my-3 items-center">
							<div className="flex flex-col gap-3 w-3/4">
								<p>
									{index + 1}. {questions.title}
								</p>
								<p>Jawaban : {answer}</p>
								<span>
									Bukti :{" "}
									{data?.point[index].proof ? (
										<Link
											href={`${process.env.NEXT_PUBLIC_BASE_URL}/api/actualfile/${data.point[index].proof?.file_name}`}
											target="_blank"
										>
											{data.point[index].proof?.file_name}
										</Link>
									) : (
										<p>-</p>
									)}
								</span>
							</div>
							<div className="flex flex-row gap-3 justify-end items-center w-1/4">
								<Controller
									name={`skor.${index}`}
									control={control}
									render={({ field }) => (
										<Select
											aria-label="status"
											disallowEmptySelection
											variant="bordered"
											placeholder="Pilih nilai"
											isInvalid={!!errors.skor?.[index]}
											errorMessage={errors.skor?.[index]?.message}
											{...field}
										>
											<SelectItem
												key={`${data?.point[index].answer}`}
												value={data?.point[index].answer}
											>
												Sudah Tepat
											</SelectItem>
											<SelectItem key={"0"} value={"0"}>
												Tidak Tepat
											</SelectItem>
										</Select>
									)}
								/>
							</div>
						</div>
						<Divider />
					</div>
				);
			})}
			{/* <input
				type="text"
				className="hidden"
				defaultValue={assesmentKey}
				{...register("id_assessment")}
			/>
			<input
				type="text"
				className="hidden"
				defaultValue={subBab}
				{...register("sub_bab")}
			/> */}
			<div className="flex justify-end items-center mt-5">
				<Button color="primary" variant="solid" type="submit">
					Simpan
				</Button>
			</div>
		</form>
	);
}
