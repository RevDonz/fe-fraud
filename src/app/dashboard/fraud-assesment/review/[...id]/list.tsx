"use client";

import { ListSubBab, Questions } from "@/constant/assesment";
import { getDetailAssesment } from "@/lib/assesment";
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Divider,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { Check } from "lucide-react";
import Link from "next/link";
import LoadingReviewAssesment from "./loadingReview";

export default function ReviewAssesmentList({
	token,
	assesmentKey,
}: { token: string; assesmentKey: string }) {
	const { data, isPending } = useQuery({
		queryKey: ["review-fraud-list-assesment", assesmentKey],
		queryFn: async () => {
			const data = await getDetailAssesment(token, assesmentKey);

			return data;
		},
	});

	const selesai =
		data?.assessment.id_reviewer_internal !== null &&
		data?.assessment.hasil_internal !== null;

	if (isPending) return <LoadingReviewAssesment />;

	const unFinished = ListSubBab.filter((subbab) => data?.point[subbab] === 0);
	const finished = ListSubBab.filter((subbab) => data?.point[subbab] !== 0);

	return (
		<div className="flex flex-col gap-5">
			{selesai && (
				<Table aria-label="Example static collection table">
					<TableHeader>
						<TableColumn>PENGISI ASSESMENT</TableColumn>
						<TableColumn>REVIEWER</TableColumn>
						<TableColumn>TANGGAL & WAKTU PENILAIAN</TableColumn>
						<TableColumn>HASIL</TableColumn>
						<TableColumn>AKSI</TableColumn>
					</TableHeader>
					<TableBody>
						<TableRow key="1">
							<TableCell>{data?.assessment.admin}</TableCell>
							<TableCell>
								{data?.assessment.reviewer_internal === ""
									? "Belum dinilai"
									: data?.assessment.reviewer_internal}
							</TableCell>
							<TableCell>{data?.assessment.tanggal}</TableCell>
							<TableCell>
								{data?.assessment.hasil_internal === null
									? "Belum dinilai"
									: data?.assessment.hasil_internal}
							</TableCell>
							<TableCell>
								<Button
									type="button"
									color="primary"
									isDisabled={data?.assessment.hasil_internal === null}
								>
									Unduh Laporan
								</Button>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			)}

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

											{selesai ? (
												<div className="flex gap-3" key={`${index * 2}`}>
													<Button
														size="sm"
														color="success"
														className="text-white"
														isLoading={isPending}
													>
														{data?.point && !isPending
															? data?.point[subquestion.sub_bab.toString()]
															: ""}
													</Button>

													<Button
														size="sm"
														as={Link}
														color="primary"
														href={`/dashboard/fraud-assesment/review/${assesmentKey}/${question.bab}/${subquestion.sub_bab}/detail`}
													>
														Lihat Detail
													</Button>
												</div>
											) : finished.includes(subquestion.sub_bab) ? (
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
		</div>
	);
}
