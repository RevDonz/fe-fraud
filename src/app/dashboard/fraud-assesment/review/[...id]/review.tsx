"use client";
import { Questions } from "@/constant/assesment";
import { getAssesmentSubBabByKey } from "@/lib/assesment";
import { reviewAssesmentSchema } from "@/schema/fraud/assesment";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Divider, Link } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import type { z } from "zod";

export default function ReviewAssesmentGrade({
	bab,
	subBab,
	token,
	assesmentKey,
}: { bab: number; subBab: number; token: string; assesmentKey: string }) {
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
	console.log(data);

	const {
		handleSubmit,
		register,
		getValues,
		formState: { errors },
	} = useForm<z.infer<typeof reviewAssesmentSchema>>({
		resolver: zodResolver(reviewAssesmentSchema),
	});

	const onSubmit = async (values: z.infer<typeof reviewAssesmentSchema>) => {
		console.log(values);
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
								<p>asd</p>
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
