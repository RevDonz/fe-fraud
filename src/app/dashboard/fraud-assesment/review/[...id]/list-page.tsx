"use client";
import { PrintComponent } from "@/components/detail-to-print";
import { ListSubBab, Questions } from "@/constant/assesment";
import { getAssesmentSubBabByKey, getDetailAssesment } from "@/lib/assesment";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { Check } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import LoadingReviewAssesment from "./loading-component";
import SubmitEvaluation from "./submit";

export default function ReviewAssesmentList({
	token,
	assesmentKey,
}: { token: string; assesmentKey: string }) {
	const componentRef = useRef(null);

	const { data, isPending } = useQuery({
		queryKey: ["review-fraud-list-assesment", assesmentKey],
		queryFn: async () => await getDetailAssesment(token, assesmentKey),
	});

	const {
		data: dataPrint,
		mutate,
		isPending: isPrintPending,
	} = useMutation({
		mutationKey: ["review-fraud-list-assesment", assesmentKey],
		mutationFn: async () => {
			const results = [];

			for (let index = 0; index < ListSubBab.length; index++) {
				const subBab = ListSubBab[index];

				const response = await getAssesmentSubBabByKey(
					token,
					assesmentKey,
					subBab.toString(),
				);

				if (response) {
					results.push(response);
				} else {
					throw new Error("Failed to get data");
				}
			}

			return results;
		},
		onSuccess: (data) => {
			console.log(data);
			dataToPrint();
		},
	});

	const dataToPrint = useReactToPrint({
		content: () => componentRef.current,
	});

	const selesai =
		data?.assessment.id_reviewer_internal !== null &&
		data?.assessment.hasil_internal !== null;

	if (isPending) return <LoadingReviewAssesment />;

	const unFinished = ListSubBab.filter(
		(subbab) => data?.point[subbab] === null,
	);
	const finished = ListSubBab.filter((subbab) => data?.point[subbab] !== null);

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
							<TableCell>{data?.assessment.tanggal_mulai}</TableCell>
							<TableCell>
								{data?.assessment.hasil_internal === null
									? "Belum dinilai"
									: data?.assessment.hasil_internal}
							</TableCell>
							<TableCell>
								<Button
									color="primary"
									isDisabled={data?.assessment.hasil_internal === null}
									isLoading={isPrintPending}
									onClick={() => dataToPrint()}
								>
									Unduh Laporan
								</Button>

								<div className="hidden">
									<div ref={componentRef}>
										<PrintComponent assesmentKey={assesmentKey} token={token} />
									</div>
								</div>
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

			{!selesai && (
				<SubmitEvaluation token={token} assessmentKey={assesmentKey} />
			)}
		</div>
	);
}
