"use client";
import { Questions } from "@/constant/assesment";
import { getAssesmentSubBabByKey } from "@/lib/assesment";
import { Button, Divider, Link, Skeleton } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";

export default function DetailReviewAssesmentPage({
	bab,
	subBab,
	token,
	assesmentKey,
}: { bab: number; subBab: number; token: string; assesmentKey: string }) {
	const subTitle = Questions.find((item) => item.bab === bab)?.subtitle.find(
		(sub) => sub.sub_bab === subBab,
	);
	const title = Questions.find((item) => item.bab === bab);

	const { data, isPending } = useQuery({
		queryKey: ["review-subbab-assesment-key", subBab],
		queryFn: async () => {
			const data = await getAssesmentSubBabByKey(
				token,
				assesmentKey,
				subBab.toString(),
			);
			return data;
		},
	});

	const totalSkor = data?.point.reduce(
		(total, item) => total + Number(item.skor),
		0,
	);

	return (
		<div>
			<div className="flex justify-between items-center font-semibold mb-3">
				<p>
					{subBab} {title?.title}: {subTitle?.title}
				</p>
				<div className="flex gap-2 items-center justify-center">
					<p>Nilai :</p>
					<Button color="success" size="sm" className="text-white font-medium">
						{totalSkor} / {data?.point.length}
					</Button>
				</div>
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
								<div className="flex justify-between items-center">
									{isPending ? (
										<Skeleton className="h-4 w-full rounded-md" />
									) : (
										<div className="flex flex-col gap-3">
											<p className="font-medium">Jawaban : {answer}</p>
											<div className="font-medium flex">
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
													<p>-</p>
												)}
											</div>
										</div>
									)}
								</div>
							</div>
							<div className="flex flex-row gap-3 justify-end items-center w-1/4">
								<div className="flex w-full justify-end">
									<Button
										color={
											data?.point[index].skor !== "0" ? "primary" : "danger"
										}
										size="sm"
									>
										{data?.point[index].skor !== "0" ? "Benar" : "Tidak Benar"}
									</Button>
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
