"use client";

import {
	FraudHistory,
	columns,
	type FraudHistoryType,
} from "@/app/dashboard/assesment/column";
import {
	Button,
	Chip,
	Pagination,
	Select,
	SelectItem,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@nextui-org/react";
import { useCallback, useMemo, useState } from "react";

const Datatable = () => {
	const [page, setPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const onRowsPerPageChange = useCallback(
		(e: React.ChangeEvent<HTMLSelectElement>) => {
			setRowsPerPage(Number(e.target.value));
			setPage(1);
		},
		[],
	);
	const pages = Math.ceil(FraudHistory.length / rowsPerPage);

	const items = useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;

		return FraudHistory.slice(start, end);
	}, [page, rowsPerPage]);

	const renderCell = useCallback(
		(history: FraudHistoryType, columnKey: React.Key) => {
			const cellValue = history[columnKey as keyof FraudHistoryType];

			switch (columnKey) {
				case "hasil":
					return (
						<Chip
							color={
								history.hasil >= 75
									? "success"
									: history.hasil >= 60
									  ? "warning"
									  : "danger"
							}
							radius="sm"
							className="text-white"
						>
							{`${
								history.hasil >= 75
									? "Good"
									: history.hasil >= 60
									  ? "Normal"
									  : "Bad"
							} / ${history.hasil}`}
						</Chip>
					);

				// case "tanggal":
				// 	return format(cellValue, "dd MMMM yyyy, HH:mm");

				case "aksi":
					return (
						<Button color="primary" size="sm">
							Lihat Detail
						</Button>
					);

				default:
					return cellValue;
			}
		},
		[],
	);

	return (
		<Table
			aria-label="Example table with dynamic content"
			bottomContentPlacement="outside"
			bottomContent={
				<div className="flex w-full justify-between items-center">
					<span className="text-default-400 text-small w-1/3">
						Total: {FraudHistory.length}
					</span>
					<Pagination
						isCompact
						showControls
						showShadow
						page={page}
						total={pages}
						onChange={(page) => setPage(page)}
					/>
					<div className="flex items-center justify-end w-1/3 gap-3">
						<label>Rows per page</label>
						<Select
							onChange={onRowsPerPageChange}
							defaultSelectedKeys={["5"]}
							className="max-w-20"
							size="sm"
						>
							<SelectItem key={"5"} value={5}>
								5
							</SelectItem>
							<SelectItem key={"10"} value={10}>
								10
							</SelectItem>
							<SelectItem key={"15"} value={15}>
								15
							</SelectItem>
						</Select>
					</div>
				</div>
			}
		>
			<TableHeader columns={columns}>
				{(column) => (
					<TableColumn align="end" key={column.key}>
						{column.label}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody items={items}>
				{(item) => (
					<TableRow key={item.id}>
						{(columnKey) => (
							<TableCell>{renderCell(item, columnKey)}</TableCell>
						)}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
};

export default Datatable;
