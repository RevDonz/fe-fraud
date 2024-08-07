"use client";
import { Button } from "@nextui-org/react";
import { ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function BackButton() {
	const router = useRouter();
	const pathname = usePathname();

	if (
		[
			"/dashboard/fraud-assesment/history",
			"/dashboard/fraud-detection/history",
			"/dashboard/data-staff",
		].includes(pathname)
	) {
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
