import { getServerAuthSession } from "@/lib/auth";
import type { Metadata } from "next";
import { DataTableAccounts } from "./table";

export const metadata: Metadata = {
	title: "Fraud Assesment - Accounts | Fraud Deterrence Propeller",
	description:
		"Fraud Deterrence Propeller merupakan protokol pencegahan Fraud yang digunakan oleh setiap entitas, baik yang berorientasi profit maupun non-profit.",
};

export default async function accountsPage() {
	const session = await getServerAuthSession();
	const token = session?.user.accessToken;

	return <DataTableAccounts token={token as string} />;
}
