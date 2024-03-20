"use client";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ButtonLink() {
	const pathname = usePathname();

	return (
		<div className="flex flex-row gap-3 mb-5">
			<Link href={"/dashboard/fraud-assesment/history"}>
				<Button
					variant={
						pathname === "/dashboard/fraud-assesment/history"
							? "solid"
							: "bordered"
					}
					color="primary"
				>
					Riwayat Fraud Assesment
				</Button>
			</Link>
			<Link href={"/dashboard/fraud-assesment/create"}>
				<Button
					variant={
						pathname === "/dashboard/fraud-assesment/create"
							? "solid"
							: "bordered"
					}
					color="primary"
				>
					Isi Fraud Assesment
				</Button>
			</Link>
		</div>
	);
}
