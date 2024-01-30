import { ReactNode } from "react";
import NavbarComponent from "./navbar";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="flex flex-col min-h-screen w-full">
			<NavbarComponent />
			{children}
		</div>
	);
};

export default DashboardLayout;
