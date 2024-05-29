"use client";
import { Questions } from "@/constant/assesment";
import { getDetailAssesment } from "@/lib/assesment";
import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function DetailAssesmentList({
	token,
	assesmentKey,
}: { token: string; assesmentKey: string }) {
	const { data, isPending } = useQuery({
		queryKey: ["fraud-detail-assesment"],
		queryFn: async () => {
			const data = await getDetailAssesment(token, assesmentKey);
			return data;
		},
	});

	return (
		<div className="flex flex-col gap-5">
			{/* <Table aria-label="Example static collection table">
			<TableHeader>
				<TableColumn>PENGISI ASSESMENT</TableColumn>
				<TableColumn>REVIEWER</TableColumn>
				<TableColumn>TANGGAL & WAKTU PENILAIAN</TableColumn>
				<TableColumn>HASIL</TableColumn>
				<TableColumn>AKSI</TableColumn>
			</TableHeader>
			<TableBody>
				<TableRow key="1">
					<TableCell>{data?.assesment.nama_admin}</TableCell>
					<TableCell>{data?.assesment.nama_reviewer}</TableCell>
					<TableCell>{data?.assesment.tanggal}</TableCell>
					<TableCell>{data?.assesment.hasil}</TableCell>
					<TableCell>
						<Button type="button">Unduh</Button>
					</TableCell>
				</TableRow>
			</TableBody>
		</Table> */}
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
