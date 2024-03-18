"use client";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ButtonLink() {
	const pathname = usePathname();

	return (
		<div className="flex flex-row gap-3 mb-5">
			<Link href={"/dashboard/assesment"}>
				<Button
					variant={pathname === "/dashboard/assesment" ? "solid" : "bordered"}
					color="primary"
				>
					Riwayat Fraud Assesment
				</Button>
			</Link>
			<Link href={"/dashboard/assesment/fill"}>
				<Button
					variant={
						pathname === "/dashboard/assesment/fill" ? "solid" : "bordered"
					}
					color="primary"
				>
					Isi Fraud Assesment
				</Button>
			</Link>
		</div>
	);
}
