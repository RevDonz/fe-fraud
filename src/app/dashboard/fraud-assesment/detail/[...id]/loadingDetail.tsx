"use client";
import { Questions } from "@/constant/assesment";
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

export default function LoadingDetailAssesment() {
	return (
		<div className="flex flex-col gap-5">
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
						<TableCell> </TableCell>
						<TableCell> </TableCell>
						<TableCell> </TableCell>
						<TableCell> </TableCell>
						<TableCell>
							<Button type="button" className="invisible">
								Unduh
							</Button>
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

										<Button isLoading size="sm" color="primary">
											Loading
										</Button>
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
