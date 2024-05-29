"use client";
import { getDetailAssesment } from "@/lib/assesment";
import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";

export default function DetailAssesmentPage({
	token,
	assesmentKey,
}: { token: string; assesmentKey: string }) {
	const { data, isLoading } = useQuery({
		queryKey: ["fraud-history"],
		queryFn: async () => {
			const data = await getDetailAssesment(token, assesmentKey);
			return data;
		},
	});

	return (
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
					<TableCell>{data?.assesment.nama_admin}</TableCell>
					<TableCell>{data?.assesment.nama_reviewer}</TableCell>
					<TableCell>{data?.assesment.tanggal}</TableCell>
					<TableCell>{data?.assesment.hasil}</TableCell>
					<TableCell>
						<Button type="button">Unduh</Button>
					</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	);
}
