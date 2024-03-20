import Datatable from "@/components/datatable";

import ButtonLink from "../../../../components/button-link";
import { FraudHistory, columns, renderCellFraudHistory } from "./column";

const HistoryAssesmentPage = () => {
	return (
		<>
			<ButtonLink />

			<Datatable
				data={FraudHistory}
				columns={columns}
				renderCell={renderCellFraudHistory}
			/>
		</>
	);
};

export default HistoryAssesmentPage;
