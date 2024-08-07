"use client";
import { PrintComponent } from "@/components/detail-to-print";
import { ListSubBab, Questions } from "@/constant/assesment";
import { getAssesmentSubBabByKey, getDetailAssesment } from "@/lib/assesment";
import { getEntity } from "@/lib/entity";
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
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import LoadingReviewAssesment from "./loading-component";
import SubmitEvaluation from "./submit";

export default function ReviewAssesmentList({
	token,
	assesmentKey,
}: { token: string; assesmentKey: string }) {
	const componentRef = useRef(null);

	const { data: entity } = useQuery({
		queryKey: ["entity-fraud-detection"],
		queryFn: async () => {
			const data = await getEntity(token);
			return data;
		},
	});

	const { data, isPending } = useQuery({
		queryKey: ["review-fraud-list-assesment", assesmentKey],
		queryFn: async () => await getDetailAssesment(token, assesmentKey),
	});

	const { isPending: isPrintPending, data: dataToPrint2 } = useQuery({
		queryKey: ["review-fraud-list-assesment", assesmentKey],
		queryFn: async () => {
			try {
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
					}
				}

				return results;
			} catch (error) {
				console.log(error);
			}
		},
	});

	const dataToPrint = useReactToPrint({
		content: () => componentRef.current,
	});

	const selesai =
		data?.assessment.id_reviewer_internal !== "" &&
		data?.assessment.hasil_internal !== null;

	const externalSelesai =
		data?.assessment.id_reviewer_external !== "" &&
		data?.assessment.hasil_external !== null;

	if (isPending) return <LoadingReviewAssesment />;

	const unFinished = ListSubBab.filter(
		(subbab) => data?.point[subbab][0] === null,
	);
	const finished = ListSubBab.filter(
		(subbab) => data?.point[subbab][0] !== null,
	);

	const unFinishedExternal = ListSubBab.filter(
		(subbab) => data?.point[subbab][1] === null,
	);
	const finishedExternal = ListSubBab.filter(
		(subbab) => data?.point[subbab][1] !== null,
	);

	return (
		<div className="flex flex-col gap-5">
			{entity?.data_key !== "external"
				? selesai && (
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
												<PrintComponent dataToPrint={dataToPrint2 ?? []} />
											</div>
										</div>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					)
				: externalSelesai && (
						<Table aria-label="Example static collection table">
							<TableHeader>
								<TableColumn>PENGISI ASSESMENT</TableColumn>
								<TableColumn>REVIEWER</TableColumn>
								<TableColumn>TANGGAL & WAKTU PENILAIAN</TableColumn>
								<TableColumn>HASIL INTERNAL</TableColumn>
								<TableColumn>HASIL EXTERNAL</TableColumn>
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
										{data?.assessment.hasil_external === null
											? "Belum dinilai"
											: data?.assessment.hasil_external}
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
												<PrintComponent dataToPrint={dataToPrint2 ?? []} />
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

											{entity?.data_key === "external" ? (
												externalSelesai ? (
													<div className="flex gap-3" key={`${index * 2}`}>
														<Button
															size="sm"
															color="success"
															className="text-white"
															isLoading={isPending}
														>
															{data?.point && !isPending
																? data?.point[subquestion.sub_bab.toString()][1]
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
												) : finishedExternal.includes(subquestion.sub_bab) ? (
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
												) : unFinishedExternal[0] === subquestion.sub_bab ? (
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
												)
											) : selesai ? (
												<div className="flex gap-3" key={`${index * 2}`}>
													<Button
														size="sm"
														color="success"
														className="text-white"
														isLoading={isPending}
													>
														{data?.point && !isPending
															? data?.point[subquestion.sub_bab.toString()][0]
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

			{entity?.data_key !== "external"
				? !selesai && (
						<SubmitEvaluation token={token} assessmentKey={assesmentKey} />
					)
				: !externalSelesai && (
						<SubmitEvaluation token={token} assessmentKey={assesmentKey} />
					)}
		</div>
	);
}
