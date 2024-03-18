import Datatable from "@/components/datatable";
import { FraudHistory, columns, renderCellFraudHistory } from "./column";

const HistoryAssesmentPage = () => {
	return (
		<Datatable
			data={FraudHistory}
			columns={columns}
			renderCell={renderCellFraudHistory}
		/>
	);
};

export default HistoryAssesmentPage;
