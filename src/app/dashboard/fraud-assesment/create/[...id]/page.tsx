import { Questions, type SubBab } from "@/constant/assesment";
import { getServerAuthSession } from "@/lib/auth";
import { Divider } from "@nextui-org/react";
import type { Metadata } from "next";
import CreateAssesmentForm from "./form";

export const metadata: Metadata = {
	title: "Fraud Assesment - Create | Fraud Deterrence Propeller",
	description:
		"Fraud Deterrence Propeller merupakan protokol pencegahan Fraud yang digunakan oleh setiap entitas, baik yang berorientasi profit maupun non-profit.",
};

export default async function FillQuestionPage({
	params,
}: {
	params: { id: string };
}) {
	const session = await getServerAuthSession();
	const token = session?.user.accessToken;

	const bab = Number(params.id[0]);
	const subBab = Number(params.id[1]);

	const title = Questions.find((item) => item.bab === bab);
	const subTitle = Questions.find((item) => item.bab === bab)?.subtitle.find(
		(sub) => sub.sub_bab === subBab,
	);

	return (
		<div className="p-3">
			<p className="font-semibold mb-3">
				{subBab} {title?.title}: {subTitle?.title}
			</p>
			<Divider />
			<CreateAssesmentForm
				subTitle={subTitle as SubBab}
				bab={bab}
				sub={subBab}
				token={token as string}
			/>
		</div>
	);
}
