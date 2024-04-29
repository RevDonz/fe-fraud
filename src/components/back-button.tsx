"use client";
import { Button } from "@nextui-org/react";
import { ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function BackButton() {
	const router = useRouter();
	const pathname = usePathname();

	if (pathname === "/dashboard/fraud-assesment/history") {
		return null;
	}

	return (
		<Button
			variant="bordered"
			isIconOnly
			color="primary"
			onClick={() => router.back()}
      aria-label="back-button"
		>
			<ArrowLeft />
		</Button>
	);
}
