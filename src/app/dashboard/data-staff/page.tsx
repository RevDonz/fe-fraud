import ButtonLink from "@/components/button-link-staff";
import { getServerAuthSession } from "@/lib/auth";
import TableStaff from "./table";

export default async function DataStaffPage() {
	const session = await getServerAuthSession();
	const token = session?.user.accessToken;
	return (
		<>
			<ButtonLink />

			<TableStaff token={token as string} />
		</>
	);
}
