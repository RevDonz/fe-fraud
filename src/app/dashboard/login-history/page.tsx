"use client";
import {
	Card,
	CardBody,
	CardHeader,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	getKeyValue,
} from "@nextui-org/react";
import { DataLoginHistory, columns } from "./columns";

export default function LoginHistoryPage() {
	return (
		<div className="flex flex-col w-full max-w-screen-xl mx-auto px-6 py-10 gap-5">
			<p className="text-2xl font-semibold">Riwayat Login</p>
			<Card className="p-3">
				<CardBody>
					<div className="grid grid-cols-6 gap-3"></div>
				</CardBody>
			</Card>

			<Table aria-label="Example table with dynamic content">
				<TableHeader columns={columns}>
					{(column) => (
						<TableColumn key={column.key}>{column.label}</TableColumn>
					)}
				</TableHeader>
				<TableBody items={DataLoginHistory}>
					{(item) => (
						<TableRow key={item.id}>
							{(columnKey) => (
								<TableCell>{getKeyValue(item, columnKey)}</TableCell>
							)}
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
