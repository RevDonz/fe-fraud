"use client";
import type { SubBab } from "@/constant/assesment";
import type { assesmentSchema } from "@/schema/fraud/assesment";
import { Button, Divider, Radio, RadioGroup } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

export default function CreateAssesmentForm({
	subTitle,
	bab,
	sub,
	token,
}: { subTitle: SubBab; bab: number; sub: number; token: string }) {
	const { handleSubmit, register } = useForm<z.infer<typeof assesmentSchema>>();

	const onSubmit = async (values: z.infer<typeof assesmentSchema>) => {
		// for (const assesment of values.assesment) {
		// 	await fetch(
		// 		`${process.env.NEXT_PUBLIC_BASE_URL}/api/point?bab=${assesment.bab}&sub_bab=${assesment.sub_bab}&point=${assesment.point}&answer=${assesment.answer}`,
		// 		{
		// 			headers: { Authorization: `Bearer ${token}` },
		// 		},
		// 	);
		// }
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{subTitle?.questions?.map((questions, index) => {
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
							</div>
							<div className="flex flex-col gap-1">
								<p>Upload bukti</p>
								<input
									type="file"
									className="border file:hidden px-2 py-1 rounded-md text-sm"
								/>
							</div>
						</div>
						<Divider />
					</div>
				);
			})}
			<div className="flex justify-between items-center mt-5">
				<Button color="primary" variant="solid" type="submit">
					Submit
				</Button>
			</div>
		</form>
	);
}
