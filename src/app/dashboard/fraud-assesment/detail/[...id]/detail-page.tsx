"use client";
import { Questions } from "@/constant/assesment";
import { getAssesmentSubBabByKey } from "@/lib/assesment";
import { Divider, Link, Skeleton } from "@nextui-org/react";
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
			</div>
			<Divider />
			{subTitle?.questions?.map((questions, index) => {
				const answer =
					data?.point[index].answer === 1
						? "Ada, dan sudah lengkap"
						: data?.point[index].answer === 0.5
							? "		Ada, belum lengkap"
							: "		Belum ada";
				return (
					<div key={`${index * 2}`}>
						<div className="flex w-full justify-between my-3 items-center">
							<div className="flex flex-col gap-3 w-3/4">
								<p>
									{index + 1}. {questions.title}
								</p>
								<div className="flex justify-between items-center mr-5">
									{isPending ? (
										<Skeleton className="h-4 w-full rounded-md" />
									) : (
										<p className="font-medium">Jawaban : {answer}</p>
									)}
								</div>
							</div>
							<div className="flex flex-row gap-3 justify-end items-center w-1/4">
								<div className="flex flex-col gap-3 w-full">
									<div className="flex flex-col gap-3">
										<p>Bukti : </p>
										{data?.point[index].id_proof !== null ? (
											<Link
												size="sm"
												href={`${process.env.NEXT_PUBLIC_BASE_URL}/api/actualfile/${data?.point[index].id_proof?.file_name}`}
												target="_blank"
											>
												{data?.point[index].id_proof?.file_name}
											</Link>
										) : (
											<p className="text-danger">-</p>
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
