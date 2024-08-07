import { getServerAuthSession } from "@/lib/auth";
import DetailAssesmentPage from "./detail-page";
import DetailAssesmentList from "./list-page";

export default async function DetailAssesment({
	params,
}: {
	params: { id: string };
}) {
	const key = params.id[0];
	const bab = Number(params.id[1]);
	const subBab = Number(params.id[2]);
	const session = await getServerAuthSession();
	const token = session?.user.accessToken as string;

	return (
		<div>
			{bab && subBab ? (
				<DetailAssesmentPage
					bab={bab}
					subBab={subBab}
					token={token}
					assesmentKey={key}
				/>
			) : (
				<DetailAssesmentList token={token} assesmentKey={key} />
			)}
		</div>
	);
}
