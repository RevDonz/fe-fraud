import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "401 - Unauthorized",
};

const Unauthorized = () => {
	return (
		<div>
			<div className="p-6">unauthorized</div>
		</div>
	);
};

export default Unauthorized;
