import ButtonLink from "@/components/button-link-detection";
import type { Metadata } from "next";
import DetectionTable from "./table";
import { getServerAuthSession } from "@/lib/auth";

export const metadata: Metadata = {
	title: "Fraud Detection | Fraud Deterrence Propeller",
	description:
		"Fraud Deterrence Propeller merupakan protokol pencegahan Fraud yang digunakan oleh setiap entitas, baik yang berorientasi profit maupun non-profit.",
};

export default async function FraudDetectionPage() {
  const session = await getServerAuthSession();
	const token = session?.user.accessToken;

	return (
		<>
			<ButtonLink />
			<DetectionTable token={token as string} />
		</>
	);
}
