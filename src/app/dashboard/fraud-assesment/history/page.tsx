import { getServerAuthSession } from "@/lib/auth";
import ButtonLink from "../../../../components/button-link";
import TableHistroy from "./table";

const HistoryAssesmentPage = async () => {
	const session = await getServerAuthSession();
	const token = session?.user.accessToken;

	return (
		<>
			<ButtonLink />

			<TableHistroy token={token as string} />

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
