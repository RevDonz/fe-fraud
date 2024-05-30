import { Questions } from "@/constant/assesment";
import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

export default function LoadingAssesment() {
	return (
		<div className="flex flex-col gap-5">
			{Questions.map((question, index) => (
				<Card key={`${index * 2}`}>
					<CardHeader>
						<p className="font-semibold">
							{index + 1}. {question.title}
						</p>
					</CardHeader>
					{question.subtitle.map((subquestion, subIndex) => (
						<div key={`${subIndex * 2}`}>
							<Divider />
							<CardBody>
								<div className="flex items-center justify-between ml-4">
									<p>
										{index + 1}.{subIndex + 1}. {subquestion.title}
									</p>

									<Button size="sm" color="primary" isDisabled isLoading>
										Loading
									</Button>
								</div>
							</CardBody>
						</div>
					))}
				</Card>
			))}
		</div>
	);
}
