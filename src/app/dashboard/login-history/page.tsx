import { getServerAuthSession } from "@/lib/auth";
import { Card } from "@nextui-org/react";
import type { Metadata } from "next";
import TableLoginHistory from "./table";

export const metadata: Metadata = {
	title: "Data Staf | Fraud Deterrence Propeller",
	description:
		"Fraud Deterrence Propeller merupakan protokol pencegahan Fraud yang digunakan oleh setiap entitas, baik yang berorientasi profit maupun non-profit.",
};

export default async function LoginHistoryPage() {
	const session = await getServerAuthSession();
	const token = session?.user.accessToken;
	return (
		<div className="flex flex-col w-full max-w-screen-xl mx-auto px-6 py-10 gap-5">
			<div className="flex items-center gap-5">
				<p className="text-2xl font-semibold">Riwayat Aktivitas Pengguna</p>
			</div>
			<Card className="p-3">
				<TableLoginHistory token={token as string} />
			</Card>
		</div>
	);
}
