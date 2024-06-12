"use client";
import { getEntity } from "@/lib/entity";
import { Divider } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";

export default function FormDetection({ token }: { token: string }) {
	const { data, isPending } = useQuery({
		queryKey: ["entity-fraud-detection"],
		queryFn: async () => {
			const data = await getEntity(token);
			return data;
		},
	});

	const DataTableRow = [
		{
			variable: "Revenue",
		},
		{
			variable: "Cost of Goods Sold",
		},
		{
			variable: "Selling, General, & Admin. Expense",
		},
		{
			variable: "Depreciation",
		},
		{
			variable: "Net Income from Continuing Operations",
		},
		{
			variable: "Accounts Receivables",
		},
		{
			variable: "Current Assets",
		},
		{
			variable: "Property, Plants, & Equipment",
		},
		{
			variable: "Securities",
		},
		{
			variable: "Total Assets",
		},
		{
			variable: "Current Liabilities",
		},
		{
			variable: "Total Long-term Debt",
		},
		{
			variable: "Cash Flow from Operations",
		},
	];

	const FinancialRatiosIndexes = [
		{
			index: "Day Sales in Receivables Index (DSRI)",
		},
		{
			index: "Gross Margin Index (GMI)",
		},
		{
			index: "Asset Quality Index (AQI)",
		},
		{
			index: "Sales Growth Index (SGI)",
		},
		{
			index: "Depreciation Index (DEPI)",
		},
		{
			index: "Selling, General, & Admin. Expenses Index (SGAI)",
		},
		{
			index: "Leverage Index (LVGI)",
		},
		{
			index: "Total Accruals to Total Assets (TATA)",
		},
	];

	return (
		<div>
			<p className="text-xl font-medium py-5">{data?.name}</p>
			<Divider />
			<div className="flex flex-col gap-5 py-5">
				<p className="font-medium">Upload Laporan Keuangan</p>
				<div className="grid grid-cols-2 gap-5">
					<div className="flex flex-col gap-1">
						<p className="text-sm">Tahun Pertama :</p>
						<input
							placeholder="Enter your username"
							type="file"
							accept=".pdf"
							className="file:hidden px-3 py-2 rounded-xl text-sm border-2 hover:border-gray-400"
							onChange={(e) => {
								if (e.target.files && e.target.files.length > 0) {
									console.log(e.target.files[0]);
								}
							}}
						/>
					</div>
					<div className="flex flex-col gap-1">
						<p className="text-sm">Tahun Kedua :</p>
						<input
							placeholder="Enter your username"
							type="file"
							accept=".pdf"
							className="file:hidden px-3 py-2 rounded-xl text-sm border-2 hover:border-gray-400"
							onChange={(e) => {
								if (e.target.files && e.target.files.length > 0) {
									console.log(e.target.files[0]);
								}
							}}
						/>
					</div>
				</div>
			</div>
			<Divider />

			<div className="py-5">
				<div className="grid grid-cols-3 border rounded-tl-lg rounded-tr-lg">
					<div className="bg-default-100 px-3 py-2 text-sm font-medium text-foreground-500 rounded-tl-lg">
						( IN MILLION )
					</div>
					<div className="bg-default-100 px-3 py-2 text-sm font-medium text-foreground-500">
						YEAR 2 (Rupiah)
					</div>
					<div className="bg-default-100 px-3 py-2 text-sm font-medium text-foreground-500 rounded-tr-lg">
						YEAR 1 (Rupiah)
					</div>
				</div>
				{DataTableRow.map((row) => {
					return (
						<div
							className="grid grid-cols-3 gap-1 border-x border-b"
							key={row.variable}
						>
							<div className="px-3 py-2 border-r">{row.variable}</div>
							<div className="border-r">
								<input
									type="number"
									className="px-3 py-2 w-full focus:outline-none text-right"
								/>
							</div>
							<div className="">
								<input
									type="number"
									className="px-3 py-2 w-full focus:outline-none text-right"
								/>
							</div>
						</div>
					);
				})}
				<p className="italic mt-3 ml-3">
					Securities is also referred to as total long term investments
				</p>
			</div>
			<div className="py-5">
				<div className="grid grid-cols-4 border rounded-tl-lg rounded-tr-lg">
					<div className="bg-default-100 px-3 py-2 text-sm font-medium text-foreground-500 rounded-tl-lg">
						Financial Ratios Indexes
					</div>
					<div className="bg-default-100 px-3 py-2 text-sm font-medium text-foreground-500">
						YEAR 2
					</div>
					<div className="bg-default-100 px-3 py-2 text-sm font-medium text-foreground-500">
						YEAR 1
					</div>
					<div className="bg-default-100 px-3 py-2 text-sm font-medium text-foreground-500 rounded-tr-lg">
						INDEX
					</div>
				</div>
				{FinancialRatiosIndexes.map((row) => {
					return (
						<div
							className="grid grid-cols-4 gap-1 border-x border-b"
							key={row.index}
						>
							<div className="px-3 py-2 border-r">{row.index}</div>
							<div className="border-r">
								<input type="number" className="w-full focus:outline-none" />
							</div>
							<div className="border-r">
								<input type="number" className="w-full focus:outline-none" />
							</div>
						</div>
					);
				})}
				<div className="grid grid-cols-4 border-b border-x rounded-bl-lg rounded-br-lg">
					<div className="bg-default-100 px-3 py-2 text-sm font-medium text-foreground-700 rounded-bl-lg col-span-3">
						Beneish M Score
					</div>
					<div className="bg-green-500 px-3 py-2 text-sm font-medium text-foreground-100 rounded-br-lg">
						-2.00
					</div>
				</div>
			</div>
		</div>
	);
}
