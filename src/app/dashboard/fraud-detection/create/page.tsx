import ButtonLink from "@/components/button-link-detection";
import FormDetection from "./form";
import { getServerAuthSession } from "@/lib/auth";

export default async function CreateDetection() {
  const session = await getServerAuthSession();
	const token = session?.user.accessToken as string;
	return (
		<>
			<ButtonLink />
			<FormDetection token={token} />
		</>
	);
}
