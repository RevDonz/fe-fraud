import Datatable from "@/components/datatable";
import { getServerAuthSession } from "@/lib/auth";
import ButtonLink from "../../../../components/button-link";
import { columns, renderCellFraudHistory } from "./column";

const getAssesmentHistory = async (token: string) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/assessments`,
		{
			headers: { Authorization: `Bearer ${token}` },
		},
	);

	const result = await response.json();
	if (result.data === null) result.data = [];

	return result.data;
};

const HistoryAssesmentPage = async () => {
	const session = await getServerAuthSession();
	const token = session?.user.accessToken;
	const data = await getAssesmentHistory(token as string);

	return (
		<>
			<ButtonLink />

			<Datatable
				data={data}
				columns={columns}
				renderCell={renderCellFraudHistory}
        label="Table Fraud Assesment"
			/>
		</>
	);
};

export default HistoryAssesmentPage;
