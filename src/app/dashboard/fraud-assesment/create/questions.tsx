"use client";

import { ListSubBab, Questions } from "@/constant/assesment";
import { getFinishedAssesment } from "@/lib/assesment";
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Divider,
	Tooltip,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { Check } from "lucide-react";
import Link from "next/link";
import LoadingAssesment from "./loadingAssesment";

interface QuestionsListProps {
	token: string;
}

const QuestionsList: React.FC<QuestionsListProps> = ({ token }) => {
	const { data: finished, isLoading } = useQuery<string[]>({
		queryKey: ["fraud-finished-assesment"],
		queryFn: async () => {
			return await getFinishedAssesment(token);
		},
	});

	if (isLoading) {
		return <LoadingAssesment />;
	}

	const unFinished =
		finished && finished.length > 0
			? ListSubBab.filter((item) => !finished.includes(item.toString()))
			: [];

	return (
		<div className="flex flex-col gap-5">
			{Questions.map((question, index) => (
				<Card key={`${index * 2}`}>
					<CardHeader>
						<p className="font-semibold">
							{index + 1}. {question.title}
						</p>
					</CardHeader>
					{question.subtitle.map((subquestion, subIndex) => (
						<div key={`${subIndex * 2}`}>
							<Divider />
							<CardBody>
								<div className="flex items-center justify-between ml-4">
									<p>
										{index + 1}.{subIndex + 1}. {subquestion.title}
									</p>

									{finished?.includes(subquestion.sub_bab.toString()) ? (
										<div className="flex gap-3" key={`${index * 2}`}>
											<Button
												size="sm"
												color="warning"
												className="text-white"
												href={`/dashboard/fraud-assesment/edit/${index + 1}/${
													index + 1
												}.${subIndex + 1}`}
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
											size="sm"
											color="primary"
											href={`/dashboard/fraud-assesment/create/${index + 1}/${
												index + 1
											}.${subIndex + 1}`}
											as={Link}
										>
											Mulai
										</Button>
									) : (
										<Tooltip
											content="Selesaikan assesment sebelumnya!"
											color="primary"
											placement="left"
											showArrow
										>
											<div>
												<Button size="sm" color="primary" isDisabled>
													Mulai
												</Button>
											</div>
										</Tooltip>
									)}
								</div>
							</CardBody>
						</div>
					))}
				</Card>
			))}
		</div>
	);
};

export default QuestionsList;
