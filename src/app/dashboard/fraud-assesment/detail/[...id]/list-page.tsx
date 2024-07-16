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
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	Tooltip,
	useDisclosure,
} from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import LoadingDetailAssesment from "./loading-component";

export default function DetailAssesmentList({
	token,
	assesmentKey,
}: { token: string; assesmentKey: string }) {
	const { onOpenChange } = useDisclosure();
	const router = useRouter();
	const componentRef = useRef(null);

	const dataToPrint = useReactToPrint({
		content: () => componentRef.current,
	});

	const { isPending: isPrintPending } = useMutation({
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

	const { data, isPending } = useQuery({
		queryKey: ["fraud-detail-assesment", assesmentKey],
		queryFn: async () => {
			const data = await getDetailAssesment(token, assesmentKey);

			return data;
		},
	});

	if (isPending) return <LoadingDetailAssesment />;

	return (
		<div className="flex flex-col gap-5">
			<Modal
				isOpen={!data?.assessment.is_done}
				onOpenChange={onOpenChange}
				isDismissable={false}
				hideCloseButton
				size="xl"
				backdrop="blur"
			>
				<ModalContent>
					<ModalHeader className="flex flex-col gap-1">
						Assesment belum selesai!
					</ModalHeader>
					<ModalBody>
						<p className="text-danger-500">Dilarang masuk!</p>
					</ModalBody>
					<ModalFooter className="flex items-center justify-between">
						<Button
							color="primary"
							onClick={() => router.push("/dashboard/fraud-assesment/history")}
						>
							Kembali
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
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
						<TableCell>
							{data?.assessment.tanggal_nilai !== null
								? data?.assessment.tanggal_nilai
								: "Belum dinilai"}
						</TableCell>
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
									<PrintComponent assesmentKey={assesmentKey} token={token} />
								</div>
							</div>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
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

										<div className="flex gap-3" key={`${index * 2}`}>
											{data?.point[subquestion.sub_bab.toString()][0] && (
												<Tooltip content="Penilaian Reviewer Internal">
													<Button
														size="sm"
														color="success"
														className="text-white"
														isLoading={isPending}
													>
														{data?.point[subquestion.sub_bab.toString()][0]}
													</Button>
												</Tooltip>
											)}
											{data?.point[subquestion.sub_bab.toString()][1] && (
												<Tooltip content="Penilaian Reviewer External">
													<Button
														size="sm"
														color="success"
														className="text-white"
														isLoading={isPending}
													>
														{data?.point[subquestion.sub_bab.toString()][1]}
													</Button>
												</Tooltip>
											)}

											<Button
												color="primary"
												size="sm"
												className="text-white"
												href={`/dashboard/fraud-assesment/detail/${assesmentKey}/${question.bab}/${subquestion.sub_bab}`}
												as={Link}
											>
												Lihat Detail
											</Button>
										</div>
									</div>
								</CardBody>
							</div>
						))}
					</Card>
				))}
			</div>
		</div>
	);
}
