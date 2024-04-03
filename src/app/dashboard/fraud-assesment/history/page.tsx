import { getServerAuthSession } from "@/lib/auth";
import ButtonLink from "../../../../components/button-link";
import TableHistory from "./table";

const HistoryAssesmentPage = async () => {
	const session = await getServerAuthSession();
	const token = session?.user.accessToken;

	return (
		<>
			<ButtonLink />

			<TableHistory token={token as string} />
		</>
	);
};

export default HistoryAssesmentPage;
