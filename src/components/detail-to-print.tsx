"use client";
import { Questions } from "@/constant/assesment";
import type { DetailAssesmentWithKey } from "@/types/assesment";
import {
	Button,
	Card,
	Divider,
	Link,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@nextui-org/react";
interface PrintComponentProps {
	dataToPrint: DetailAssesmentWithKey[];
}

export const PrintComponent = ({ dataToPrint }: PrintComponentProps) => {
	return (
		<div className="flex flex-col w-full max-w-screen-xl mx-auto px-6 py-10 gap-5">
			<div className="flex items-center gap-5">
				<p className="text-2xl font-semibold">Fraud Assesment</p>
			</div>

			<Table aria-label="Example static collection table">
				<TableHeader>
					<TableColumn>PENGISI ASSESMENT</TableColumn>
					<TableColumn>REVIEWER</TableColumn>
					<TableColumn>TANGGAL & WAKTU PENILAIAN</TableColumn>
					<TableColumn>HASIL</TableColumn>
				</TableHeader>
				<TableBody>
					<TableRow key="1">
						<TableCell>{dataToPrint?.[0]?.assessment.admin}</TableCell>
						<TableCell>
							{dataToPrint?.[0]?.assessment?.reviewer_internal === ""
								? "Belum dinilai"
								: dataToPrint?.[0]?.assessment?.reviewer_internal}
						</TableCell>
						<TableCell>{dataToPrint?.[0]?.assessment?.tanggal_mulai}</TableCell>
						<TableCell>
							{dataToPrint?.[0]?.assessment?.hasil_internal === null
								? "Belum dinilai"
								: dataToPrint?.[0]?.assessment?.hasil_internal}
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>

			{dataToPrint?.map((data, index) => {
				const totalSkor = data?.point.reduce(
					(total, item) => total + Number(item.skor),
					0,
				);
				const subTitle = Questions.find(
					(item) => item.bab === Number(data.point[index].bab),
				)?.subtitle.find(
					(sub) => sub.sub_bab === Number(data.point[index].sub_bab),
				);
				const title = Questions.find(
					(item) => item.bab === Number(data.point[index].bab),
				);
				return (
					<Card className="p-3 " key={`${data.assessment.data_key}-${index}`}>
						<div className="flex justify-between items-center font-semibold mb-3">
							<p>
								{data.point[index].sub_bab} {title?.title}: {subTitle?.title}
							</p>
							<div className="flex gap-2 items-center justify-center">
								<p>Nilai :</p>
								<Button
									color="success"
									size="sm"
									className="text-white font-medium"
								>
									{totalSkor} / {data?.point.length}
								</Button>
							</div>
						</div>
						<Divider />
						{subTitle?.questions?.map((questions, index) => {
							const answer =
								data?.point[index]?.answer === 1
									? "Ada, dan sudah lengkap"
									: data?.point[index]?.answer === 0.5
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
												<div className="flex flex-col gap-3">
													<p className="font-medium">Jawaban : {answer}</p>
													<div className="font-medium flex">
														<p>Bukti : </p>
														{data?.point[index]?.id_proof !== null ? (
															<Link
																size="sm"
																href={`${process.env.NEXT_PUBLIC_BASE_URL}/api/actualfile/${data?.point[index]?.id_proof?.file_name}`}
																target="_blank"
															>
																{data?.point[index]?.id_proof?.file_name}
															</Link>
														) : (
															<p>-</p>
														)}
													</div>
												</div>
											</div>
										</div>
										<div className="flex flex-row gap-3 justify-end items-center w-1/4">
											<div className="flex w-full justify-end">
												<Button
													color={
														data?.point[index]?.skor !== "0"
															? "primary"
															: "danger"
													}
													size="sm"
												>
													{data?.point[index]?.skor !== "0"
														? "Benar"
														: "Tidak Benar"}
												</Button>
											</div>
										</div>
									</div>
									<Divider />
								</div>
							);
						})}
					</Card>
				);
			})}
		</div>
	);
};
