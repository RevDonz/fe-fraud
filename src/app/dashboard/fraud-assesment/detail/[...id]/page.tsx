import { getServerAuthSession } from "@/lib/auth";
import DetailAssesmentPage from "./detail";

export default async function DetailAssesment({
	params,
}: {
	params: { id: string };
}) {
	const key = params.id[0];
	const session = await getServerAuthSession();
	const token = session?.user.accessToken as string;

	return (
		<div>
			<DetailAssesmentPage token={token} assesmentKey={key} />
		</div>
	);
}
