import { ReactNode } from "react";
import NavbarComponent from "../../components/navbar";

const AuthLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="flex flex-col hero-container w-full">
			<NavbarComponent />
			<div className="flex-1">{children}</div>
		</div>
	);
};

export default AuthLayout;
