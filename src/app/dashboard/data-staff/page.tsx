import ButtonLink from "@/components/button-link-staff";
import { getServerAuthSession } from "@/lib/auth";
import type { Metadata } from "next";
import TableStaff from "./table";

export const metadata: Metadata = {
	title: "Data Staf | Fraud Deterrence Propeller",
	description:
		"Fraud Deterrence Propeller merupakan protokol pencegahan Fraud yang digunakan oleh setiap entitas, baik yang berorientasi profit maupun non-profit.",
};

export default async function DataStaffPage() {
	const session = await getServerAuthSession();
	const token = session?.user.accessToken;
	return (
		<>
			<ButtonLink />

			<TableStaff token={token as string} />
		</>
	);
}
