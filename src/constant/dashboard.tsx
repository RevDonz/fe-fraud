import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

export const DataDashboard = [
	{
		role: "superadmin",
		component: <p>asd</p>,
	},
	{
		role: "staff",
		component: <p>asd</p>,
	},
	{
		role: "admin",
		component: (
			<CardBody>
				<div className="flex flex-col gap-5">
					<Card className="p-3" shadow="sm">
						<CardHeader>
							<p className="font-semibold">1. Fraud Assesment</p>
						</CardHeader>
						<Divider />
						<CardBody>
							<div className="flex flex-col gap-3 text-justify">
								<p>
									Fraud Assesment atau Assesment Resiko, merupakan fitur dalam
									aplikasi FDP yang memungkinkan untuk memberikan informasi
									mengenai tingkat kerentanan entitas terhadap fraud atau
									kecurangan pada laporan keuangan melalui assesment yang di
									isi. Dengan metode Fraud Deterrence Propeller, Fraud Assesment
									mempunyai 6 indikator, yaitu :
								</p>
								<ol className="list-outside list-decimal pl-4">
									<li>Due Dilligent</li>
									<p className="mb-3">
										Indikator dalam pelaksanaan assesment resiko fraud dan
										terdapat akuntan internal yang kompeten di entitas.
									</p>
									<li>Enhancement (Improvement)</li>
									<p className="mb-3">
										Indikator dalam perbaikan terus menerus terhadap SOP dan
										Internal Control.
									</p>
									<li>Truthfulness and Respect</li>
									<p className="mb-3">
										Indikator dalam membangun tata kelola dan tindakan membangun
										Budaya Integritas.
									</p>
									<li>Efficacy of Mind</li>
									<p className="mb-3">
										Indikator dalam Operant Conditioning dan Pemodelan.
									</p>
									<li>Reinforcement and Communication</li>
									<p className="mb-3">
										Indikator dalam Penguatan Positif dan Budaya Komunikasi.
									</p>
									<li>Enforcement Actions</li>
									<p>
										Indikator dalam Penegakan hukum dalam entitas dan denda.
									</p>
								</ol>
								<p>
									Setelah mengisi Fraud Assesment, akun Reviewer akan menilai,
									dan detail nilai akan keluar berdasarkan 6 indikator diatas,
									dengan itu, entitas dapat mengetahui indikator mana yang belum
									terpenuhi, dan sudah terpenuhi.
								</p>
							</div>
						</CardBody>
					</Card>
					<Card className="p-3" shadow="sm">
						<CardHeader>
							<p className="font-semibold">2. Fraud Detection</p>
						</CardHeader>
						<CardBody>
							<div className="flex flex-col gap-3 text-justify">
								<p>
									{
										"Fraud Detection atau Pendeteksi Fraud, merupakan fitur untuk mendeteksi kemungkinan manipulasi data pada laporan keuangan entitas. Fitur ini menggunakan Beneish M-Score dalam implementasinya. Dengan membandingkan 2 laporan keuangan, apabila skor yang muncul < -2.22 Kemungkinan entitas tidak memanipulasi data laporan keuangan, apabila skor yang muncul > -2.22 Kemungkinan entitas memanipulasi data laporan keuangan."
									}
								</p>
							</div>
						</CardBody>
					</Card>
					<Card className="p-3" shadow="sm">
						<CardHeader>
							<p className="font-semibold">3. Data Staff</p>
						</CardHeader>
						<CardBody>
							<div className="flex flex-col gap-3 text-justify">
								<p>
									{
										"Pada fitur Data Staff, Admin bisa melakukan pengelolaan akun berupa Staff dan Reviewer. Tugas peran Staff adalah mengisi laporan keuangan pada fitur Fraud Detection, dan tugas peran Reviewer adalah menilai Fraud Assesment yang sudah di isi."
									}
								</p>
							</div>
						</CardBody>
					</Card>
					<Card className="p-3" shadow="sm">
						<CardHeader>
							<p className="font-semibold">4. Riwayat Login</p>
						</CardHeader>
						<CardBody>
							<div className="flex flex-col gap-3 text-justify">
								<p>
									{
										"Pada fitur Riwayat Login, Admin dapat melihat riwayat pengguna yang mengakses aplikasi. Admin dapat memantau Staff dan Reviewer yang mengakses aplikasi. "
									}
								</p>
							</div>
						</CardBody>
					</Card>
				</div>
			</CardBody>
		),
	},
];
