"use client";
import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const FooterLandingPage = () => {
	const pathname = usePathname();
	return (
		<div className={cn("bg-[#002E62]", pathname !== "/" ? "hidden" : "")}>
			<div className="max-w-screen-xl mx-auto px-6 w-full">
				<div className="py-10 flex flex-col gap-10">
					<div className="bg-white p-10 rounded-lg flex flex-col sm:flex-row justify-between items-center">
						<div className="w-full sm:w-3/4 flex flex-col gap-3">
							<p className="text-2xl font-bold">
								Daftarkan entitas untuk menggunakan FDP!
							</p>
							<div className="">
								<Button color="primary" as={Link} href="/auth/register">
									Daftarkan sekarang!
								</Button>
							</div>
						</div>
						<div className="w-full sm:w-1/4 flex justify-end">
							<Image
								alt="fraud-detect"
								src={"/assets/img/logo.svg"}
								width={150}
								height={150}
							/>
						</div>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-4 text-white gap-5">
						<div className="col-span-2 flex flex-col gap-3 w-full md:w-4/5">
							<p className="font-semibold">Tentang FDP</p>
							<p>
								FDP Merupakan protokol pencegahan Fraud yang digunakan oleh
								setiap entitas, baik yang berorientasi profit maupun non-profit.
							</p>
							<p>
								Dalam protokol tersebut terdapat beberapa dimensi dan indikator
								pencegahan fraud yang wajib dilakukan entitas dan tersedia di
								entitas, anda dapat mengukur tingkat maturity pencegahan fraud
								di lingkungan anda, dengan mempergunakan FDP.
							</p>
							<p>
								FDP Juga menyediakan layanan pendeteksi kecurangan pada Laporan
								Keuangan menggunakan Beneish M-Score Calculator.
							</p>
						</div>
						<div className="flex flex-col gap-3">
							<p className="font-semibold">Hubungi Kami</p>
							<div className="flex flex-col">
								<p>+62847 8282 4747</p>
								<p>fdp@gmail.com</p>
							</div>
						</div>
						<div className="flex flex-col gap-3">
							<p className="font-semibold">Halaman</p>
							<div className="flex flex-col">
								<p>Fitur Utama Kami</p>
								<p>Tentang Kami</p>
								<p>Hubungi Kami</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="flex items-center justify-center w-full h-12 border-t">
				<p className="text-white">© 2024 FDP. All Rights Reserved.</p>
			</div>
		</div>
	);
};

export default FooterLandingPage;
