"use client";
import { Questions } from "@/constant/assesment";
import { getAssesmentSubBabByKey } from "@/lib/assesment";
import { reviewAssesmentSchema } from "@/schema/fraud/assesment";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Divider, Link, Select, SelectItem } from "@nextui-org/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

export default function EditAssesmentGrade({
	bab,
	subBab,
	token,
	assesmentKey,
}: { bab: number; subBab: number; token: string; assesmentKey: string }) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const { data, isPending } = useQuery({
		queryKey: ["current-subbab-assesment-key-edit", subBab],
		queryFn: async () => {
			const data = await getAssesmentSubBabByKey(
				token,
				assesmentKey,
				subBab.toString(),
			);
			return data;
		},
	});

	const defaultValue = isPending
		? []
		: data?.point.map((evaluation) =>
				evaluation.skor.toString() === "0"
					? evaluation.skor.toString() === evaluation.answer.toString()
						? "0"
						: "tidak-tepat"
					: evaluation.skor.toString(),
			);

	const {
		handleSubmit,
		setValue,
		control,
		formState: { errors },
	} = useForm<z.infer<typeof reviewAssesmentSchema>>({
		resolver: zodResolver(reviewAssesmentSchema),
		defaultValues: {
			id_assessment: assesmentKey,
			sub_bab: subBab.toString(),
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
			toast.dismiss();
			toast.success("Berhasil");
			queryClient.invalidateQueries({
				queryKey: ["current-subbab-assesment-key-edit"],
			});
			router.push(`/dashboard/fraud-assesment/review/${assesmentKey}`);
		},
		onError(error) {
			toast.dismiss();
			toast.error("Gagal edit review!");
			console.log("Error edit", error.message);
		},
	});

	const onSubmit = async (values: z.infer<typeof reviewAssesmentSchema>) => {
		values.skor = values.skor.map((skor) =>
			skor === "tidak-tepat" ? "0" : skor,
		);

		mutation.mutate(values);
	};

	const subTitle = Questions.find((item) => item.bab === bab)?.subtitle.find(
		(sub) => sub.sub_bab === subBab,
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (!isPending) setValue("skor", defaultValue as string[]);
	}, [isPending]);

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
									{data?.point[index].id_proof ? (
										<Link
											href={`${process.env.NEXT_PUBLIC_BASE_URL}/api/actualfile/${data.point[index].id_proof?.file_name}`}
											target="_blank"
										>
											{data.point[index].id_proof?.file_name}
										</Link>
									) : (
										<span>-</span>
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
											defaultSelectedKeys={field.value}
											selectedKeys={[field.value]}
											{...field}
										>
											<SelectItem key={`${data?.point[index].answer}`}>
												Sudah Tepat
											</SelectItem>
											<SelectItem key={"tidak-tepat"}>Tidak Tepat</SelectItem>
										</Select>
									)}
								/>
							</div>
						</div>
						<Divider />
					</div>
				);
			})}

			<div className="flex justify-end items-center mt-5">
				<Button color="primary" variant="solid" type="submit">
					Simpan
				</Button>
			</div>
		</form>
	);
}
