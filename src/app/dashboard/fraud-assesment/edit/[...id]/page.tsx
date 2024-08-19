import { Questions, type SubBab } from "@/constant/assesment";
import { getServerAuthSession } from "@/lib/auth";
import { Divider } from "@nextui-org/react";
import EditAssesmentForm from "./form";

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
			<div className="flex justify-between items-center mb-3">
				<p className="font-semibold">
					{subBab} {title?.title}: {subTitle?.title}
				</p>
				<p className="text-danger">
					File yang diunggah tidak boleh melebihi 1MB.
				</p>
			</div>
			<Divider />
			<EditAssesmentForm
				subTitle={subTitle as SubBab}
				bab={bab}
				sub={subBab}
				token={token as string}
			/>
		</div>
	);
}
