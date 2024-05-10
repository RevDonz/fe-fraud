import { getServerAuthSession } from "@/lib/auth";
import TableHistroy from "./table";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Fraud Assesment - History | Fraud Deterrence Propeller",
	description:
		"Fraud Deterrence Propeller merupakan protokol pencegahan Fraud yang digunakan oleh setiap entitas, baik yang berorientasi profit maupun non-profit.",
};

export default async function FraudAssesmentGrade() {
	const session = await getServerAuthSession();
	const token = session?.user.accessToken;

	return <TableHistroy token={token as string} />;
}
