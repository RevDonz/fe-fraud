"use client";
import { Questions } from "@/constant/assesment";
import { getAssesmentSubBabByKey } from "@/lib/assesment";
import {
	Chip,
	Divider,
	Link,
	Radio,
	RadioGroup,
	Skeleton,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";

export default function DetailAssesmentPage({
	bab,
	subBab,
	token,
	assesmentKey,
}: { bab: number; subBab: number; token: string; assesmentKey: string }) {
	const title = Questions.find((item) => item.bab === bab);
	const subTitle = Questions.find((item) => item.bab === bab)?.subtitle.find(
		(sub) => sub.sub_bab === subBab,
	);

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

	return (
		<div className="p-3">
			<div className="flex justify-between items-center mb-3">
				<p className="font-semibold">
					{subBab} {title?.title}: {subTitle?.title}
				</p>
				<div className="flex gap-3">
					<p>Nilai :</p>
					<Chip color={"success"} variant={"flat"} radius="sm">
						<p className="w-24 text-center">
							{/* {data?.point && !isPending
								? data?.point[subTitle?.sub_bab.toString()]
								: ""} */}
						</p>
					</Chip>
				</div>
			</div>
			<Divider />
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
											value={data?.point[index].answer.toString()}
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
										{data?.point[index].proof !== null ? (
											<Link
												size="sm"
												href={`${process.env.NEXT_PUBLIC_BASE_URL}/api/actualfile/${data?.point[index].proof?.file_name}`}
												target="_blank"
											>
												{data?.point[index].proof?.file_name}
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
