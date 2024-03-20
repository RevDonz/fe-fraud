import { Questions } from "@/constant/assesment";
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Checkbox,
	Chip,
	Divider,
	Link,
} from "@nextui-org/react";
import { Check } from "lucide-react";
import ButtonLink from "../../../../components/button-link";

const FillAssesmentPage = () => {
	return (
		<>
			<ButtonLink />

			<div className="flex flex-col gap-5">
				{/* <ModalAssesment /> */}
				{Questions.map((question, index) => {
					return (
						<Card>
							<CardHeader>
								<p className="font-semibold">
									{index + 1}. {question.title}
								</p>
							</CardHeader>
							{question.subtitle.map((subquestion, subIndex) => {
								return (
									<>
										<Divider />
										<CardBody>
											<div className="flex items-center justify-between ml-4">
												<p>
													{index + 1}.{subIndex + 1}. {subquestion.title}
												</p>
												{index === 1 ? (
													<div className="flex gap-3">
														<Button
															size="sm"
															color="warning"
															className="text-white"
														>
															Edit
														</Button>
														<Button
															color="success"
															isIconOnly
															size="sm"
															className="text-white"
														>
															<Check className="w-4 h-4" />
														</Button>
													</div>
												) : index === 2 ? (
													<Chip
														radius="sm"
														color="success"
														className="text-white"
													>
														8 / 10
													</Chip>
												) : (
													<Button
														size="sm"
														color="primary"
														as={Link}
														href={`/dashboard/fraud-assesment/create/${question.id}/${subquestion.id}`}
													>
														Mulai
													</Button>
												)}
											</div>
										</CardBody>
									</>
								);
							})}
						</Card>
					);
				})}
				<div className="flex flex-col mt-5 gap-5">
					<p className="text-danger text-justify">
						Dengan ini menyatakan bahwa saya telah mengisi assesment ini dengan
						itikad baik dan sepenuh hati. Saya berkomitmen untuk memberikan
						jawaban yang sejelas dan seakurat mungkin, tanpa menggunakan bantuan
						pihak lain atau materi yang tidak diizinkan. Kejujuran saya dalam
						mengisi laporan ini adalah landasan untuk pengembangan diri saya.
					</p>
					<div className="flex flex-row items-center justify-between">
						<Checkbox>Saya setuju dengan pernyataan diatas</Checkbox>
						<Button color="success" className="text-white">
							Submit
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default FillAssesmentPage;
