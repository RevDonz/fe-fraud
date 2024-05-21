"use client";

import {
	Pagination,
	Select,
	SelectItem,
	Spinner,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	getKeyValue,
} from "@nextui-org/react";
import { useCallback, useMemo, useState } from "react";
type Column = {
	key: string;
	label: string;
};
interface GenericItem {
	id: string;
}

type LoadingState =
	| "loading"
	| "sorting"
	| "loadingMore"
	| "error"
	| "idle"
	| "filtering";

interface DataTableProps<TData> {
	data: TData[];
	columns: Column[];
	label?: string;
	renderCell?: (row: TData, columnKey: React.Key) => React.ReactNode;
	isLoading?: boolean;
}

export function Datatable<TData extends GenericItem>({
	data,
	columns,
	label = "Table",
	isLoading,
	renderCell,
}: DataTableProps<TData>) {
	const [page, setPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const loadingState: LoadingState = isLoading ? "loading" : "idle";

	const onRowsPerPageChange = useCallback(
		(e: React.ChangeEvent<HTMLSelectElement>) => {
			setRowsPerPage(Number(e.target.value));
			setPage(1);
		},
		[],
	);

	const pages = Math.ceil(data.length / rowsPerPage);

	const items = useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;

		return data.slice(start, end);
	}, [page, data, rowsPerPage]);

	return (
		<Table
			aria-label={label}
			bottomContentPlacement="outside"
			classNames={{
				table: isLoading && "min-h-[205px]",
			}}
			bottomContent={
				<div className="flex w-full justify-between items-center">
					<span className="text-default-400 text-small w-1/3">
						Total: {data.length}
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
						<p>Rows per page</p>
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
			<TableBody
				items={items}
				loadingContent={<Spinner />}
				loadingState={loadingState}
				emptyContent={!isLoading && data.length < 1 && "Tidak ada data"}
			>
				{(item) => {
					return (
						<TableRow key={item.id as React.Key}>
							{(columnKey) => (
								<TableCell>
									{renderCell
										? renderCell(item, columnKey)
										: getKeyValue(item, columnKey)}
								</TableCell>
							)}
						</TableRow>
					);
				}}
			</TableBody>
		</Table>
	);
}

export default Datatable;
