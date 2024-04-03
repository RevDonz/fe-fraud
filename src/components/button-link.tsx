"use client";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ButtonLink() {
	const pathname = usePathname();

	return (
		<div className="flex flex-row gap-3 mb-5">
			<Button
				variant={
					pathname === "/dashboard/fraud-assesment/history"
						? "solid"
						: "bordered"
				}
				color="primary"
				as={Link}
				href={"/dashboard/fraud-assesment/history"}
			>
				Riwayat Fraud Assesment
			</Button>
			{/* <Link href={"/dashboard/fraud-assesment/history"}></Link> */}
			<Button
				variant={
					pathname === "/dashboard/fraud-assesment/create"
						? "solid"
						: "bordered"
				}
				color="primary"
				as={Link}
				href={"/dashboard/fraud-assesment/create"}
			>
				Isi Fraud Assesment
			</Button>
		</div>
	);
}
