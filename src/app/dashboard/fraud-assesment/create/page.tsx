import ButtonLink from "@/components/button-link";
import ModalAssesment from "@/components/modal-fraud-assesment";
import { ListSubBab, Questions } from "@/constant/assesment";
import {
	getAssesmentHistory,
	getFinishedAssesment,
	startAssesment,
} from "@/lib/assesment";
import { getServerAuthSession } from "@/lib/auth";
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Divider,
	Tooltip,
} from "@nextui-org/react";
import { Check } from "lucide-react";
import Link from "next/link";
import SubmitButton from "./submit-button";

export default async function FillAssesmentPage() {
	const session = await getServerAuthSession();
	const token = session?.user.accessToken;
	const fraudHistory = await getAssesmentHistory(token as string);

	const finished: string[] = await getFinishedAssesment(token as string);

	const unFinished =
		finished.length > 0
			? ListSubBab.filter((item) => !finished.includes(item.toString()))
			: [];

	const isAttempAssesment = await startAssesment(token as string);

	const key = fraudHistory.length > 0 && fraudHistory[0].key;

	return (
		<>
			{isAttempAssesment && <ModalAssesment />}
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

												{finished.length > 0 ? (
													finished.includes(subquestion.sub_bab.toString()) ? (
														<div className="flex gap-3" key={`${index * 2}`}>
															<Button
																size="sm"
																color="warning"
																className="text-white"
																href={`/dashboard/fraud-assesment/edit/${
																	index + 1
																}/${index + 1}.${subIndex + 1}`}
																as={Link}
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
													)
												) : index === 0 && subIndex === 0 ? (
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
				<SubmitButton id={key} token={token as string} />
			</div>
		</>
	);
}
