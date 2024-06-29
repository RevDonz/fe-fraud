"use client";

import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
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
	type Selection,
	type SortDescriptor,
} from "@nextui-org/react";
import { ChevronDownIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
type Column = {
	key: string;
	label: string;
	sortable: boolean;
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

interface FilterOptions<T> {
	column: keyof T;
	options: Array<{ uid: string; name: string }>;
}

interface DataTableProps<TData> {
	data: TData[];
	columns: Column[];
	label?: string;
	renderCell?: (row: TData, columnKey: React.Key) => React.ReactNode;
	isLoading?: boolean;
	rowPage?: number;
	filterOptions?: FilterOptions<TData>;
}

export function Datatable<TData extends GenericItem, TOption>({
	data,
	columns,
	label = "Table",
	isLoading,
	rowPage = 5,
	renderCell,
	filterOptions,
}: DataTableProps<TData>) {
	const [page, setPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(rowPage);
	const loadingState: LoadingState = isLoading ? "loading" : "idle";
	const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
		direction: "ascending",
	});

	const [selectedFilter, setSelectedFilter] = useState<Selection>("all");

	const onRowsPerPageChange = useCallback(
		(e: React.ChangeEvent<HTMLSelectElement>) => {
			setRowsPerPage(Number(e.target.value));
			setPage(1);
		},
		[],
	);

	const filteredItems = useMemo(() => {
		if (!filterOptions || selectedFilter === "all") {
			return data;
		}

		const selectedFilterSet = new Set(selectedFilter as unknown as string[]);

		return data.filter((item) =>
			selectedFilterSet.has(String(item[filterOptions.column])),
		);
	}, [data, selectedFilter, filterOptions]);

	const pages = Math.ceil(filteredItems.length / rowsPerPage);

	const items = useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;
		return filteredItems.slice(start, end);
	}, [page, filteredItems, rowsPerPage]);

	const sortedData = useMemo(() => {
		if (!sortDescriptor.column) return items;
		return [...items].sort((a: TData, b: TData) => {
			const first = a[sortDescriptor.column as keyof TData] as number;
			const second = b[sortDescriptor.column as keyof TData] as number;
			const cmp = first < second ? -1 : first > second ? 1 : 0;
			return sortDescriptor.direction === "descending" ? -cmp : cmp;
		});
	}, [sortDescriptor, items]);

	const TopContent = () => {
		if (filterOptions)
			return (
				<div className="flex w-full justify-between items-center">
					<Dropdown>
						<DropdownTrigger className="hidden sm:flex">
							<Button
								endContent={<ChevronDownIcon className="text-small" />}
								variant="flat"
							>
								Status
							</Button>
						</DropdownTrigger>
						<DropdownMenu
							disallowEmptySelection
							aria-label="Table Columns"
							closeOnSelect={false}
							selectedKeys={selectedFilter}
							selectionMode="multiple"
							onSelectionChange={setSelectedFilter}
						>
							{(filterOptions?.options ?? []).map((role) => (
								<DropdownItem key={role.uid} className="capitalize">
									{role.name}
								</DropdownItem>
							))}
						</DropdownMenu>
					</Dropdown>
				</div>
			);
	};

	const BottomContent = () => {
		return (
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
					onChange={setPage}
				/>
				<div className="flex items-center justify-end w-1/3 gap-3">
					<p>Rows per page</p>
					<Select
						onChange={onRowsPerPageChange}
						selectedKeys={[rowsPerPage]}
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
		);
	};

	return (
		<Table
			aria-label={label}
			bottomContentPlacement="outside"
			classNames={{
				table: isLoading && "min-h-[205px]",
			}}
			topContent={<TopContent />}
			bottomContent={<BottomContent />}
			sortDescriptor={sortDescriptor}
			onSortChange={setSortDescriptor}
		>
			<TableHeader columns={columns}>
				{(column) => (
					<TableColumn
						align="end"
						key={column.key}
						allowsSorting={column.sortable}
					>
						{column.label}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody
				items={sortedData}
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
