import { Button, Card, CardBody } from "@nextui-org/react";
import { FileCheck2, FileSearch } from "lucide-react";
import Image from "next/image";

const LandingPage = async () => {
	return (
		<div className="flex flex-col w-full">
			<div className="bg-[#f7f7f7]">
				<div
					className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-5 content-center justify-items-stretch hero-container px-6 max-w-screen-xl mx-auto"
					id="hero"
				>
					<div className="flex flex-col justify-center gap-5">
						<p className="text-primary-500 font-semibold text-3xl">
							Pantau Laporan Keuangan Instansi Anda
						</p>
						<p>
							FDP Memudahkan pemantauan Laporan Keuangan pada perusahaan anda.
							Dengan mengisi assesment pencegahan kecurangan pada Laporan
							Keuangan. FDP Juga menyediakan layanan pendeteksi kecurangan pada
							Laporan Keuangan menggunakan Beneish M-Score Calculator.
						</p>
					</div>
					<div className="justify-self-center">
						<Image
							alt="hero-image"
							src={"/assets/img/hero-image.svg"}
							width={450}
							height={450}
						/>
					</div>
				</div>
			</div>
			<div
				className="px-6 max-w-screen-xl mx-auto py-32 flex flex-col items-center justify-center gap-10"
				id="hero"
			>
				<p className="text-primary-500 font-semibold text-3xl">
					Fitur Utama Kami
				</p>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full lg:w-3/4">
					<Card radius="sm" className="h-full p-5 ">
						<CardBody className="flex flex-col gap-5 items-center">
							<FileCheck2 className="h-16 w-16 text-primary-500" />
							<p className="font-semibold text-xl">Fraud Assesment</p>
							<p className="text-justify">
								Fitur assessment risiko ini membantu mengevaluasi tingkat
								kerentanan perusahaan terhadap kecurangan laporan keuangan
								melalui serangkaian pertanyaan yang terfokus pada upaya
								pencegahan kecurangan.
							</p>
							<div className="items-center justify-center flex mt-auto">
								<Button color="primary" size="sm">
									Lihat Lebih Detail
								</Button>
							</div>
						</CardBody>
					</Card>
					<Card radius="sm" className="h-full p-5">
						<CardBody className="flex flex-col gap-5 items-center">
							<FileSearch className="h-16 w-16 text-primary-500" />
							<p className="font-semibold text-xl">Deteksi Fraud Keuangan</p>
							<p className="text-justify">
								Fitur deteksi laporan keuangan ini mengintegrasikan nilai
								laporan keuangan baru dan mengontraskannya dengan data laporan
								keuangan yang sudah ada menggunakan model Beneish M-Score.
								Output yang dihasilkan memberikan evaluasi mendalam tentang
								potensi kecurangan dalam laporan keuangan.
							</p>
							<div className="items-center justify-center flex">
								<Button color="primary" size="sm">
									Lihat Lebih Detail
								</Button>
							</div>
						</CardBody>
					</Card>
				</div>
			</div>
			<div className="bg-[#f7f7f7]">
				<div
					className="grid grid-cols-1 md:grid-cols-2 gap-5 content-center justify-items-stretch px-6 py-32 max-w-screen-xl mx-auto"
					id="hero"
				>
					<div className="flex flex-col justify-center gap-5">
						<p className="text-primary-500 font-semibold text-3xl">
							Assesment Risiko
						</p>
						<p className="text-justify">
							Fitur assessment risiko merupakan alat efektif untuk mengevaluasi
							kerentanan perusahaan terhadap kecurangan laporan keuangan.
							Melalui pertanyaan pencegahan kecurangan, sistem menghasilkan
							nilai risiko, memberikan insight langsung kepada manajemen.
							Pendekatan ini tidak hanya mengukur risiko kecurangan, tetapi juga
							membantu merinci tingkat risiko perusahaan. Solusi cepat dan
							terukur ini memungkinkan langkah-langkah proaktif dalam menjaga
							integritas laporan keuangan.
						</p>
					</div>
					<div className="justify-self-center md:justify-self-end">
						<Image
							alt="risk-assesment"
							src={"/assets/img/risk-assesment.svg"}
							width={450}
							height={450}
						/>
					</div>
				</div>
			</div>
			<div
				className="grid grid-cols-1 md:grid-cols-2 gap-5 content-center justify-items-stretch px-6 py-32 max-w-screen-xl mx-auto"
				id="hero"
			>
				<div className="col-start-1 row-start-2 md:row-start-1 justify-self-center md:justify-self-start">
					<Image
						alt="fraud-detect"
						src={"/assets/img/fraud-detect.png"}
						width={450}
						height={450}
					/>
				</div>
				<div className="flex flex-col justify-center gap-5 col-start-1 row-start-1 md:col-start-2 md:row-start-1">
					<p className="text-primary-500 font-semibold text-3xl">
						Deteksi Fraud Keuangan
					</p>
					<p className="text-justify">
						Fitur deteksi fraud pada laporan keuangan ini memanfaatkan nilai
						terbaru laporan keuangan dan membandingkannya dengan data yang telah
						ada menggunakan model Beneish M-Score. Dengan menganalisis indikator
						kecurangan, fitur ini menghasilkan output yang menilai apakah
						terdapat tanda-tanda fraud dalam laporan keuangan. Pendekatan ini
						mencakup evaluasi manipulasi pendapatan, ketidaksesuaian arus kas,
						dan pola perilaku keuangan mencurigakan. Sebagai alat deteksi yang
						efektif, fitur ini tidak hanya menjaga keandalan laporan keuangan
						tetapi juga membantu mengidentifikasi dan mengatasi potensi risiko
						fraud.
					</p>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
