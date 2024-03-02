import FooterLandingPage from "@/components/landing/footer";

import { getServerAuthSession } from "@/lib/auth";
import { ReactNode } from "react";
import NavbarComponent from "../../components/navbar";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
	const session = await getServerAuthSession();

	return (
		<div className="flex flex-col min-h-screen w-full">
			<NavbarComponent
				name={session?.user.name as string}
				email={session?.user.email as string}
				role={session?.user.role}
			/>
			<div className="flex-1">{children}</div>

			<FooterLandingPage />
		</div>
	);
};

export default DashboardLayout;
