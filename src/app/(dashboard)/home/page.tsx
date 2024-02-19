export const metadata: Metadata = {
	title: "Home Page",
};

import { getServerAuthSession } from "@/lib/auth";
import { Metadata } from "next";

const HomePage = async () => {
	const session = await getServerAuthSession();
	console.log(session);

	return (
		<div className="flex items-center w-full max-w-screen-xl mx-auto px-6 py-10">
			<p>Home Page</p>
		</div>
	);
};

export default HomePage;
