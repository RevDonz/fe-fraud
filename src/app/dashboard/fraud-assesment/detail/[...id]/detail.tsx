"use client";
import { Questions } from "@/constant/assesment";
import { getAssesmentSubBab } from "@/lib/assesment";
import { Divider, Link, Radio, RadioGroup, Skeleton } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";

export default function DetailAssesmentPage({
	bab,
	subBab,
	token,
}: { bab: number; subBab: number; token: string }) {
	const subTitle = Questions.find((item) => item.bab === bab)?.subtitle.find(
		(sub) => sub.sub_bab === subBab,
	);

	const { data, isPending } = useQuery({
		queryKey: ["detail-subbab-assesment", subBab],
		queryFn: async () => {
			const data = await getAssesmentSubBab(token, subBab.toString());
			return data;
		},
	});

	return (
		<div>
			{subTitle?.questions?.map((questions, index) => {
				return (
					<div key={`${index * 2}`}>
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
											value={data?.[index].answer.toString()}
										>
											<Radio type="radio" value="1">
												Ada, dan sudah lengkap
											</Radio>
											<Radio type="radio" value="2">
												Ada, belum lengkap
											</Radio>
											<Radio type="radio" value="3">
												Belum ada
											</Radio>
										</RadioGroup>
									)}
								</div>
							</div>
							<div className="flex flex-row gap-3 justify-end items-center w-1/4">
								<div className="flex flex-col gap-3 w-full">
									<div className="flex flex-col gap-3">
										<p>Bukti</p>
										{data?.[index].proof !== null ? (
											<Link
												size="sm"
												href={`http://devta-1-j8022502.deta.app/api/actualfile/${data?.[index].proof?.file_name}`}
												target="_blank"
											>
												{data?.[index].proof?.file_name}
											</Link>
										) : (
											<p>-</p>
										)}
									</div>
								</div>
							</div>
						</div>
						<Divider />
					</div>
				);
			})}
		</div>
	);
}
