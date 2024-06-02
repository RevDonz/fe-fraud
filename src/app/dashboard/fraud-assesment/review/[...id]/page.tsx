import { Questions } from "@/constant/assesment";
import { getServerAuthSession } from "@/lib/auth";
import { Divider } from "@nextui-org/react";
import EditAssesmentGrade from "./edit";
import ReviewAssesmentList from "./list";
import ReviewAssesmentGrade from "./review";
import SubmitEvaluation from "./submit";

export default async function ReviewPage({
	params,
}: {
	params: { id: string };
}) {
	const session = await getServerAuthSession();
	const token = session?.user.accessToken as string;

	const key = params.id[0];
	const bab = Number(params.id[1]);
	const subBab = Number(params.id[2]);
	const isEdit = params.id[3] === "edit";

	const title = Questions.find((item) => item.bab === bab);
	const subTitle = Questions.find((item) => item.bab === bab)?.subtitle.find(
		(sub) => sub.sub_bab === subBab,
	);
	return (
		<div>
			{bab && subBab && isEdit ? (
				<div className="p-3">
					<p className="font-semibold mb-3">
						{subBab} {title?.title}: {subTitle?.title}
					</p>
					<Divider />
					<EditAssesmentGrade
						bab={bab}
						subBab={subBab}
						token={token}
						assesmentKey={key}
					/>
				</div>
			) : bab && subBab ? (
				<div className="p-3">
					<p className="font-semibold mb-3">
						{subBab} {title?.title}: {subTitle?.title}
					</p>
					<Divider />
					<ReviewAssesmentGrade
						bab={bab}
						subBab={subBab}
						token={token}
						assesmentKey={key}
					/>
				</div>
			) : (
				<>
					<ReviewAssesmentList token={token} assesmentKey={key} />
					<SubmitEvaluation token={token} assessmentKey={key} />
				</>
			)}
		</div>
	);
}
