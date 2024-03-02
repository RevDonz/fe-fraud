"use client";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const FooterLandingPage = () => {
	const pathname = usePathname();
	return (
		<div className={cn("bg-[#002E62]", pathname !== "/" ? "hidden" : "")}>
			<div className="max-w-screen-xl mx-auto px-6 w-full">
				<div className="py-10 flex flex-col gap-10">
					<div className="bg-white p-10 rounded-lg flex flex-col sm:flex-row justify-between">
						<div className="w-full sm:w-3/4">
							<p className="text-2xl font-semibold">
								Daftarkan Instansi Anda Sekarang!
							</p>
							<p>
								Daftarkan instansi anda sekarang untuk mulai melakukan
								pencegahan pada laporan keuangan anda!
							</p>
						</div>
						<div className="w-full sm:w-1/4 flex justify-end">
							<p>logo</p>
						</div>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-4 text-white gap-5">
						<div className="col-span-2 flex flex-col gap-3">
							<p className="font-semibold">Tentang FDP</p>
							<p>
								FDP Memudahkan pemantauan Laporan Keuangan pada perusahaan anda.
								Dengan mengisi assesment pencegahan kecurangan pada Laporan
								Keuangan. FDP Juga menyediakan layanan pendeteksi kecurangan
								pada Laporan Keuangan menggunakan Beneish M-Score Calculator.
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
