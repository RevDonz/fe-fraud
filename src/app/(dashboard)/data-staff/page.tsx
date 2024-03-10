"use client";

import {
	Card,
	CardBody,
	Tab,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	Tabs,
	getKeyValue,
} from "@nextui-org/react";

const DataStaffPage = () => {
	const DataStaff = [
		{
			id: "1",
			name: "Reva Doni Aprilio",
			email: "doni.staff@gmail.com",
			role: "staff",
			status: "aktif",
		},
		{
			id: "2",
			name: "Reva Doni Aprilio",
			email: "doni.staff@gmail.com",
			status: "aktif",
			role: "staff",
		},
		{
			id: "3",
			name: "Reva Doni Aprilio",
			email: "doni.staff@gmail.com",
			status: "aktif",
			role: "staff",
		},
		{
			id: "4",
			name: "Reva Doni Aprilio",
			email: "doni.staff@gmail.com",
			status: "aktif",
			role: "staff",
		},
		{
			id: "5",
			name: "Reva Doni Aprilio",
			email: "doni.staff@gmail.com",
			status: "aktif",
			role: "staff",
		},
	];

	const columns = [
		{
			key: "name",
			label: "NAMA AKUN",
		},
		{
			key: "email",
			label: "EMAIL",
		},
		{
			key: "role",
			label: "ROLE",
		},
		{
			key: "status",
			label: "AKSI",
		},
	];

	return (
		<div className="flex flex-col w-full max-w-screen-xl mx-auto px-6 py-10 gap-5">
			<p className="text-2xl font-semibold">Data Staff</p>
			<Card className="p-3">
				<Tabs aria-label="Options" color="primary" variant="bordered">
					<Tab key="photos" title="Semua Akun">
						<Table aria-label="Example table with dynamic content">
							<TableHeader columns={columns}>
								{(column) => (
									<TableColumn key={column.key}>{column.label}</TableColumn>
								)}
							</TableHeader>
							<TableBody items={DataStaff}>
								{(item) => (
									<TableRow key={item.id}>
										{(columnKey) => (
											<TableCell>{getKeyValue(item, columnKey)}</TableCell>
										)}
									</TableRow>
								)}
							</TableBody>
						</Table>
					</Tab>
					<Tab key="music" title="Tambah Akun">
						<Card>
							<CardBody>
								Ut enim ad minim veniam, quis nostrud exercitation ullamco
								laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
								dolor in reprehenderit in voluptate velit esse cillum dolore eu
								fugiat nulla pariatur.
							</CardBody>
						</Card>
					</Tab>
				</Tabs>
			</Card>
		</div>
	);
};

export default DataStaffPage;
