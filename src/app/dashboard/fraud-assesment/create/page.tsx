import { ListSubBab, Questions } from "@/constant/assesment";
import { getServerAuthSession } from "@/lib/auth";
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Checkbox,
	Divider,
	Tooltip,
} from "@nextui-org/react";
import { Check } from "lucide-react";
import Link from "next/link";
import ButtonLink from "../../../../components/button-link";

const getFinishedAssesment = async (token: string) => {
	const response = await fetch(
		"https://proj_ta-1-p8898073.deta.app/api/assessments/progress",
		{
			headers: { Authorization: `Bearer ${token}` },
		},
	);

	const result = await response.json();
	if (result.data === null) result.data = [];

	return result.data;
};

export default async function FillAssesmentPage() {
	const session = await getServerAuthSession();
	const token = session?.user.accessToken;

	const finished: string[] = await getFinishedAssesment(token as string);
	const unFinished = ListSubBab.filter(
		(item) => !finished.includes(item.toString()),
	);

	return (
		<>
			<ButtonLink />

			<div className="flex flex-col gap-5">
				{/* <ModalAssesment /> */}
				{Questions.map((question, index) => {
					return (
						<Card key={`${index * 2}`}>
							<CardHeader>
								<p className="font-semibold">
									{index + 1}. {question.title}
								</p>
							</CardHeader>
							{question.subtitle.map((subquestion, subIndex) => {
								return (
									<div key={`${subIndex * 2}`}>
										<Divider />
										<CardBody>
											<div className="flex items-center justify-between ml-4">
												<p>
													{index + 1}.{subIndex + 1}. {subquestion.title}
												</p>

												{finished.includes(subquestion.sub_bab.toString()) ? (
													<div className="flex gap-3" key={`${index * 2}`}>
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
												) : unFinished[0] === subquestion.sub_bab ? (
													<Button
														size="sm"
														color="primary"
														href={`/dashboard/fraud-assesment/create/${
															index + 1
														}/${index + 1}.${subIndex + 1}`}
														as={Link}
													>
														Mulai
													</Button>
												) : (
													<Tooltip
														content="Selesaikan assesment sebelumnya!"
														color="primary"
														placement="left"
														showArrow
													>
														<div className="">
															<Button size="sm" color="primary" isDisabled>
																Mulai
															</Button>
														</div>
													</Tooltip>
												)}
											</div>
										</CardBody>
									</div>
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
}
