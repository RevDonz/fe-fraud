import { DataDashboard } from "@/constant/dashboard";
import { getServerAuthSession } from "@/lib/auth";
import { Card, CardHeader } from "@nextui-org/react";

import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
	title: "Dashboard",
	description: "Dashboard Page",
};

const DashboardPage = async () => {
	const session = await getServerAuthSession();

	const token = session?.user.accessToken;
	const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin`, {
		headers: { Authorization: `Bearer ${token}` },
	});
	const result = await response.json();

	console.log(result.data);
	return (
		<div className="flex flex-col w-full max-w-screen-xl mx-auto px-6 py-10 gap-5">
			<p className="text-2xl font-semibold">Dashboard</p>
			<Card className="p-3">
				<CardHeader>
					<p className="text-primary-500 text-justify">
						Selamat datang di halaman Dasboard. Anda masuk sebagai{" "}
						<span className="capitalize font-semibold">
							{session?.user.role}
						</span>
						. Untuk memastikan pengalaman pengguna yang lancar, berikut adalah
						panduan singkat untuk menggunakan fitur-fitur utama aplikasi ini:
					</p>
				</CardHeader>
				{DataDashboard.map((data) => {
					if (data.role === session?.user.role)
						return React.cloneElement(data.component, { key: data.role });
				})}
			</Card>
		</div>
	);
};

export default DashboardPage;
