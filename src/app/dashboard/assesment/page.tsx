import FraudAssesmentCard from "./card";

const AssesmentPage = () => {
	return (
		<div className="flex flex-col w-full max-w-screen-xl mx-auto px-6 py-10 gap-5">
			<p className="text-2xl font-semibold">Fraud Assesment</p>
			<FraudAssesmentCard />
		</div>
	);
};

export default AssesmentPage;
