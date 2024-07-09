import ButtonLink from "@/components/button-link-assesment";
import ModalAssesment from "@/components/modal-fraud-assesment";
import { checkAssesment, getAssesmentHistory } from "@/lib/assesment";
import { getServerAuthSession } from "@/lib/auth";
import type { Metadata } from "next";
import QuestionsList from "./questions";
import SubmitButton from "./submit-button";

export const metadata: Metadata = {
	title: "Fraud Assesment - Create | Fraud Deterrence Propeller",
	description:
		"Fraud Deterrence Propeller merupakan protokol pencegahan Fraud yang digunakan oleh setiap entitas, baik yang berorientasi profit maupun non-profit.",
};

export default async function FillAssesmentPage() {
	const session = await getServerAuthSession();
	const token = session?.user.accessToken as string;
	const fraudHistory = await getAssesmentHistory(token as string);

	const isAttempAssesment = await checkAssesment(token as string);

	const assesment = fraudHistory.filter((assesment) => !assesment.is_done);

	return (
		<>
			{!isAttempAssesment && <ModalAssesment token={token as string} />}
			<ButtonLink />

			<div className="flex flex-col gap-5">
				<QuestionsList token={token} />
				<SubmitButton
					id={isAttempAssesment && assesment[0].data_key}
					token={token}
				/>
			</div>
		</>
	);
}
