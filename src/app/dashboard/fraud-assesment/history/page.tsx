import { getServerAuthSession } from "@/lib/auth";
import ButtonLink from "../../../../components/button-link";
import TableCoba from "./table";

const HistoryAssesmentPage = async () => {
	const session = await getServerAuthSession();
	const token = session?.user.accessToken;

	return (
		<>
			<ButtonLink />

			<TableCoba token={token as string} />

			{/* <Datatable
				data={data}
				columns={columns}
				renderCell={renderCellFraudHistory}
				label="Table Fraud Assesment"
			/> */}
		</>
	);
};

export default HistoryAssesmentPage;
