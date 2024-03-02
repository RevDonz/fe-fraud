import FooterLandingPage from "@/components/landing/footer";

import { ReactNode } from "react";
import NavbarComponent from "./navbar";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="flex flex-col min-h-screen w-full">
			<NavbarComponent />
			<div className="flex-1">{children}</div>
			<FooterLandingPage />
		</div>
	);
};

export default DashboardLayout;
