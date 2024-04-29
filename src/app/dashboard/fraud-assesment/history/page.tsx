import { getServerAuthSession } from "@/lib/auth";
import ButtonLink from "../../../../components/button-link-assesment";
import TableHistroy from "./table";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Fraud Assesment - History | Fraud Deterrence Propeller",
	description:
		"Fraud Deterrence Propeller merupakan protokol pencegahan Fraud yang digunakan oleh setiap entitas, baik yang berorientasi profit maupun non-profit.",
};

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
