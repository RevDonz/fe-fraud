import ButtonLink from "@/components/button-link-account";
import { getServerAuthSession } from "@/lib/auth";
import { DataTableAccounts } from "./table";

export default async function accountsPage() {
	const session = await getServerAuthSession();
	const token = session?.user.accessToken;

	return (
		<>
			<ButtonLink />
			<DataTableAccounts token={token as string} />
		</>
	);
}
