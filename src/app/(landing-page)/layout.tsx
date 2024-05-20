import FooterLandingPage from "@/components/landing/footer";
import NavbarComponent from "@/components/navbar";
import { getServerAuthSession } from "@/lib/auth";
import type React from "react";

export default async function LandingPageLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await getServerAuthSession();

	return (
		<div className="flex flex-col min-h-screen h-full w-full">
			<NavbarComponent
				name={session?.user.name as string}
				email={session?.user.email as string}
				role={session?.user.role as string}
			/>
			<div className="flex-1">{children}</div>

			<FooterLandingPage />
		</div>
	);
}
