import { Button, Card, CardBody } from "@nextui-org/react";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
	title: "Fraud Deterrence Propeller",
	description:
		"Fraud Deterrence Propeller merupakan protokol pencegahan Fraud yang digunakan oleh setiap entitas, baik yang berorientasi profit maupun non-profit.",
};

export default function LandingPage() {
	return (
		<div className="flex flex-col w-full">
			<div className="bg-[#f7f7f7]" id="home">
				<div
					className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-5 content-center justify-items-stretch hero-container px-4 max-w-screen-xl mx-auto"
					id="hero"
				>
					<div className="flex flex-col justify-center gap-5">
						<p className="text-primary-500 font-semibold text-5xl">
							Pantau Laporan Keuangan Entitas Anda
						</p>
						<p className="text-xl text-justify">
							FDP Merupakan protokol pencegahan Fraud yang digunakan oleh setiap
							entitas, baik yang berorientasi profit maupun non-profit.
						</p>
						<p className="text-xl text-justify">
							Dalam protokol tersebut terdapat beberapa dimensi dan indikator
							pencegahan fraud yang wajib dilakukan entitas dan tersedia di
							entitas, anda dapat mengukur tingkat maturity pencegahan fraud di
							lingkungan anda, dengan mempergunakan FDP.
						</p>
						<p className="text-xl text-justify">
							FDP Juga menyediakan layanan pendeteksi kecurangan pada Laporan
							Keuangan menggunakan Beneish M-Score Calculator.
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
				id="fitur-utama"
			>
				<p className="text-primary-500 font-semibold text-3xl">
					Fitur Utama Kami
				</p>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full lg:w-3/4">
					<Card radius="sm" className="h-full p-5 ">
						<CardBody className="flex flex-col gap-5 items-center">
							<Image
								alt="fraud-assesment"
								src={"/assets/img/fraud-assesment.svg"}
								width={200}
								height={200}
							/>
							<p className="font-semibold text-xl">Fraud Assesment</p>
							<p className="text-justify">
								Fitur Fraud assessment ini membantu mengevaluasi tingkat
								Maturity entitas terhadap kecurangan laporan keuangan melalui
								serangkaian pertanyaan yang terfokus pada upaya pencegahan Fraud
								di lingkungan entitas.
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
							<Image
								alt="fraud-detect"
								src={"/assets/img/fraud-detect.svg"}
								width={200}
								height={200}
							/>
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
				<div className="grid grid-cols-1 md:grid-cols-2 gap-5 content-center justify-items-stretch px-6 py-32 max-w-screen-xl mx-auto">
					<div className="flex flex-col justify-center gap-5">
						<p className="text-primary-500 font-semibold text-3xl">
							Fraud Assesment
						</p>
						<p className="text-justify">
							Fitur Fraud assessment merupakan alat efektif untuk mengevaluasi
							Tingkat Maturity entitas terhadap kecurangan laporan keuangan.
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
						{
							"Fitur deteksi fraud pada laporan keuangan ini memanfaatkan nilai terbaru laporan keuangan dan membandingkannya dengan data yang telah ada menggunakan model Beneish M-Score. Dengan output berupa skor yang menentukan apakah ada indikasi Fraud pada laporan keuangan yang berupa 2 parameter, yang pertama yaitu apabila skor output < -2.22, berarti entitas kemungkinan tidak melakukan Fraud pada data laporan keuangan. Dan parameter kedua yaitu apabila skor outpot > -2.22, berarti entitas kemungkinan melakukan Fraud pada data laporan keuangan. "
						}
					</p>
				</div>
			</div>
		</div>
	);
}
