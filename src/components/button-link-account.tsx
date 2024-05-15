"use client";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ButtonLink() {
	const pathname = usePathname();

	return (
		<div className="flex flex-row gap-3 mb-5">
			<Button
				variant={pathname === "/dashboard/accounts" ? "solid" : "bordered"}
				color="primary"
				as={Link}
				href={"/dashboard/accounts"}
			>
				Semua Akun
			</Button>
			{/* <Link href={"/dashboard/fraud-assesment/history"}></Link> */}
			<Button
				variant={
					pathname === "/dashboard/accounts"
						? "solid"
						: "bordered"
				}
				color="primary"
				as={Link}
				href={"/dashboard/accounts"}
			>
				Menunggu Konfirmasi
			</Button>
		</div>
	);
}
