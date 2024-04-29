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
			{/* <Link href={"/dashboard/fraud-detection/history"}></Link> */}
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
	);
}
