import Datatable from "@/components/datatable";
import { getServerAuthSession } from "@/lib/auth";
import ButtonLink from "../../../../components/button-link";
import { columns, renderCellFraudHistory } from "./column";
import { getAssesmentHistory } from "@/lib/assesment";



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
