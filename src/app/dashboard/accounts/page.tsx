import { getServerAuthSession } from "@/lib/auth";
import { DataTableAccounts } from "./table";

export default async function accountsPage() {
	const session = await getServerAuthSession();

	const token = session?.user.accessToken;
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin`,
		{
			headers: { Authorization: `Bearer ${token}` },
		},
	);
	const result = await response.json();

	return (
		<div className="flex flex-col w-full max-w-screen-xl mx-auto px-6 py-10 gap-5">
			<p className="text-2xl font-semibold">Kelola Akun</p>
			<DataTableAccounts data={result.data} />
		</div>
	);
}
