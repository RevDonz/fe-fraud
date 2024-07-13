"use client";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ButtonLink() {
	const pathname = usePathname();

	return (
		<div className="flex flex-row items-center justify-between gap-3 mb-5">
			<div className="flex gap-3">
				<Button
					variant={
						pathname === "/dashboard/fraud-detection/history"
							? "solid"
							: "bordered"
					}
					color="primary"
					as={Link}
					href={"/dashboard/fraud-detection/history"}
				>
					Riwayat Fraud Detection
				</Button>
				<Button
					variant={
						pathname === "/dashboard/fraud-detection/create"
							? "solid"
							: "bordered"
					}
					color="primary"
					as={Link}
					href={"/dashboard/fraud-detection/create"}
				>
					Isi Fraud Detection
				</Button>
			</div>
			{pathname === "/dashboard/fraud-detection/create" && (
				<Button color="success" className="text-white">
					Unduh Template Format File
				</Button>
			)}
		</div>
	);
}
