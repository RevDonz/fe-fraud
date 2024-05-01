"use client";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ButtonLink() {
	const pathname = usePathname();

	return (
		<div className="flex flex-row gap-3 mb-5">
			<Button
				variant={pathname === "/dashboard/data-staff" ? "solid" : "bordered"}
				color="primary"
				as={Link}
				href={"/dashboard/data-staff"}
			>
				Semua Akun
			</Button>
			{/* <Link href={"/dashboard/fraud-assesment/history"}></Link> */}
			<Button
				variant={
					pathname === "/dashboard/data-staff/create" ? "solid" : "bordered"
				}
				color="primary"
				as={Link}
				href={"/dashboard/data-staff/create"}
			>
				Tambah Akun
			</Button>
		</div>
	);
}
