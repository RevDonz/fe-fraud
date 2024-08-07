import { getServerAuthSession } from "@/lib/auth";
import DetailDetectionPage from "./detail-page";

export default async function DetailDetection({
	params,
}: {
	params: { id: string };
}) {
	const session = await getServerAuthSession();
	const token = session?.user.accessToken as string;

	return <DetailDetectionPage token={token} detectionKey={params.id} />;
}
