import { Questions } from "@/constant/assesment";
import { Button, Checkbox, Divider, Input, Link } from "@nextui-org/react";

export default function FillQuestionPage({
	params,
}: {
	params: { id: string };
}) {
	// const questions = Questions.filter()

	const questionId = params.id[0];
	const subQuestionId = params.id[1];
	const questionsSQ1 = Questions.find(
		(item) => item.id === questionId,
	)?.subtitle.find((sub) => sub.id === subQuestionId)?.questions;

	return (
		<div className="p-3">
			<p className="font-semibold mb-3">
				{questionId}: {subQuestionId}
			</p>
			<Divider />
			{questionsSQ1?.map((questions, index) => {
				return (
					<>
						<div className="flex flex-col my-3 gap-3">
							<p>
								{index + 1}. {questions.title}
							</p>
							<div className="justify-between w-full flex">
								<Checkbox value="ada-lengkap">Ada, dan sudah lengkap</Checkbox>
								<Checkbox value="ada-belum-lengkap">
									Ada, belum lengkap{" "}
								</Checkbox>
								<Checkbox value="belum-ada">Belum ada</Checkbox>
							</div>
						</div>
						<Divider />
					</>
				);
			})}
			<div className="flex justify-between items-center mt-5">
				<div className="flex flex-col gap-3">
					<p>Upload bukti</p>
					<Input size="sm" type="file" />
				</div>
				<Button
					href="/assesment/result"
					as={Link}
					color="primary"
					variant="solid"
				>
					Submit
				</Button>
			</div>
		</div>
	);
}
