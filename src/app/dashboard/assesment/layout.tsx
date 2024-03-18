import { Card } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import ButtonLink from "./button-link";

export default function AssesmentLayout({ children }: { children: ReactNode }) {

	return (
		<div className="flex flex-col w-full max-w-screen-xl mx-auto px-6 py-10 gap-5">
			<p className="text-2xl font-semibold">Fraud Assesment</p>
			<Card className="p-3">
				<ButtonLink />
				{children}
			</Card>
		</div>
	);
}
