"use client";

import { ListSubBab, Questions } from "@/constant/assesment";
import { getDetailAssesment } from "@/lib/assesment";
import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { Check } from "lucide-react";
import Link from "next/link";
import LoadingReviewAssesment from "./loadingReview";

export default function ReviewAssesmentList({
	token,
	assesmentKey,
}: { token: string; assesmentKey: string }) {
	const { data, isPending } = useQuery({
		queryKey: ["fraud-list-assesment"],
		queryFn: async () => {
			const data = await getDetailAssesment(token, assesmentKey);

			return data;
		},
	});

	if (isPending) return <LoadingReviewAssesment />;

	const unFinished = ListSubBab.filter((subbab) => data?.point[subbab] === 0);
	const finished = ListSubBab.filter((subbab) => data?.point[subbab] !== 0);

	return (
		<div className="flex flex-col gap-5">
			{Questions.map((question, index) => (
				<Card key={`${index * 2}`}>
					<CardHeader>
						<p className="font-semibold">
							{index + 1}. {question.title}
						</p>
					</CardHeader>
					{question.subtitle.map((subquestion, subIndex) => {
						return (
							<div key={`${subIndex * 2}`}>
								<Divider />
								<CardBody>
									<div className="flex items-center justify-between ml-4">
										<p>
											{index + 1}.{subIndex + 1}. {subquestion.title}
										</p>

										{finished.includes(subquestion.sub_bab) ? (
											<div className="flex gap-3" key={`${index * 2}`}>
												<Button
													size="sm"
													color="warning"
													className="text-white"
													href={`/dashboard/fraud-assesment/review/${assesmentKey}/${question.bab}/${subquestion.sub_bab}/edit`}
													as={Link}
												>
													Edit
												</Button>
												<Button
													color="success"
													isIconOnly
													size="sm"
													className="text-white"
												>
													<Check className="w-4 h-4" />
												</Button>
											</div>
										) : unFinished[0] === subquestion.sub_bab ? (
											<Button
												color="primary"
												size="sm"
												className="text-white"
												href={`/dashboard/fraud-assesment/review/${assesmentKey}/${question.bab}/${subquestion.sub_bab}`}
												as={Link}
											>
												Mulai Penilaian
											</Button>
										) : (
											<Button
												color="primary"
												isDisabled
												size="sm"
												className="text-white"
												href={`/dashboard/fraud-assesment/review/${assesmentKey}/${question.bab}/${subquestion.sub_bab}`}
												as={Link}
											>
												Mulai Penilaian
											</Button>
										)}
									</div>
								</CardBody>
							</div>
						);
					})}
				</Card>
			))}
		</div>
	);
}
