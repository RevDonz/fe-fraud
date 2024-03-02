import { getServerAuthSession } from "@/lib/auth";
import { ReactNode } from "react";
import NavbarComponent from "../../components/navbar";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
	const session = await getServerAuthSession();

	return (
		<div className="flex flex-col hero-container w-full">
			<NavbarComponent
				name={session?.user.name as string}
				email={session?.user.email as string}
				role={session?.user.role}
			/>
			<div className="flex-1">{children}</div>
		</div>
	);
};

export default AuthLayout;
