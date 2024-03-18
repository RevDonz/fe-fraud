import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { Questions } from "../_page";

const AssesmentResultPage = () => {
	return (
		<div className="flex items-center w-full max-w-screen-xl mx-auto px-6 py-10">
			<div className="max-w-2xl w-full mx-auto flex flex-col gap-10">
				<Card radius="sm">
					<CardHeader>
						<p>Hasil Assesment - 01/02/2024</p>
					</CardHeader>
					<Divider />
					<CardBody className="p-5">
						<h3 className="text-2xl mb-5">
							Total Skor : <span className="font-semibold">94</span>
						</h3>
						<div className="flex flex-col gap-5">
							{Questions.map((question, index) => {
								return (
									<Card radius="sm" key={question.title}>
										<CardHeader>
											<p className="font-semibold">
												{index + 1}. {question.title}
											</p>
										</CardHeader>
										<Divider />
										<CardBody className="py-5">
											<p>
												Skor : <span className="font-semibold">10</span>
											</p>
											<p>
												Penilaian :{" "}
												<span className="font-semibold">
													Ada, sudah lengkap
												</span>
											</p>
											<p>
												Penilaian akhir :{" "}
												<span className="font-semibold">Good</span>
											</p>
											<p>
												Lampiran :{" "}
												<span className="font-semibold">Anu.pdf</span>
											</p>
										</CardBody>
										<Divider />
									</Card>
								);
							})}
						</div>
					</CardBody>
					<Divider />
				</Card>
			</div>
		</div>
	);
};

export default AssesmentResultPage;
