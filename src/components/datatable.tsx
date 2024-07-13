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
	type Selection,
	type SortDescriptor,
	Spinner,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	getKeyValue,
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
	label: string;
	options: Array<{ uid: string; name: string }>;
}

interface DataTableProps<TData> {
	data: TData[];
	columns: Column[];
	label?: string;
	renderCell?: (row: TData, columnKey: React.Key) => React.ReactNode;
	isLoading?: boolean;
	rowPage?: number;
	filterOptions?: FilterOptions<TData>[];
}

export function Datatable<TData extends GenericItem>({
	data,
	columns,
	label = "Table",
	isLoading,
	rowPage = 5,
	renderCell,
	filterOptions = [],
}: DataTableProps<TData>) {
	const [page, setPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(rowPage);
	const loadingState: LoadingState = isLoading ? "loading" : "idle";
	const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
		direction: "ascending",
	});
	const [selectedFilters, setSelectedFilters] = useState<{
		[key: string]: Selection;
	}>(() =>
		filterOptions.reduce(
			(acc, filterOption) => {
				acc[filterOption.column as string] = "all";
				return acc;
			},
			{} as { [key: string]: Selection },
		),
	);

	const onRowsPerPageChange = useCallback(
		(e: React.ChangeEvent<HTMLSelectElement>) => {
			setRowsPerPage(Number(e.target.value));
			setPage(1);
		},
		[],
	);

	const filteredItems = useMemo(() => {
		return data.filter((item) => {
			return filterOptions.every((filterOption) => {
				const selectedFilterSet = new Set(
					selectedFilters[filterOption.column as string] as unknown as string[],
				);
				return (
					selectedFilters[filterOption.column as string] === "all" ||
					selectedFilterSet.has(String(item[filterOption.column]))
				);
			});
		});
	}, [data, selectedFilters, filterOptions]);

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
		return (
			<div className="flex w-full items-center gap-3">
				{filterOptions.map((filterOption) => (
					<Dropdown key={filterOption.column as string}>
						<DropdownTrigger className="hidden sm:flex">
							<Button
								endContent={<ChevronDownIcon className="text-small" />}
								variant="flat"
							>
								{filterOption.label}
							</Button>
						</DropdownTrigger>
						<DropdownMenu
							disallowEmptySelection
							aria-label={`Filter ${String(filterOption.column)}`}
							closeOnSelect={false}
							selectedKeys={selectedFilters[filterOption.column as string]}
							selectionMode="multiple"
							onSelectionChange={(keys) =>
								setSelectedFilters((prev) => ({
									...prev,
									[filterOption.column as string]: keys,
								}))
							}
						>
							{(filterOption?.options ?? []).map((option) => (
								<DropdownItem key={option.uid} className="capitalize">
									{option.name}
								</DropdownItem>
							))}
						</DropdownMenu>
					</Dropdown>
				))}
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
						selectedKeys={[rowsPerPage.toString()]}
						className="max-w-20"
						size="sm"
						disallowEmptySelection
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
					<TableColumn key={column.key} allowsSorting={column.sortable}>
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
