export const metadata: Metadata = {
	title: "Home Page",
};

import { Metadata } from "next";
import ModalAssesment from "./modal";

const HomePage = () => {
	return (
		<div className="flex items-center w-full max-w-screen-xl mx-auto px-6 py-10">
			<ModalAssesment />
		</div>
	);
};

export default HomePage;
