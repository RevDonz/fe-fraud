"use client";
import { submitAssesment } from "@/lib/assesment";
import { Button, Checkbox } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function SubmitButton({
	id,
	token,
}: { id: string; token: string }) {
	const [isSelected, setIsSelected] = useState(false);
	const router = useRouter();

	const handleSubmit = () => {
		const response = submitAssesment(token as string, id);
		toast.promise(response, {
			loading: "Loading..",
			success: () => {
				router.push("/dashboard/fraud-assesment/history");
				return "Berhasil";
			},
			error: (data) => {
				console.log(data);
				return "Lengkapi Assesment!";
			},
		});
	};

	const dummy = [
		[
			{
				bab: 1,
				sub_bab: 1.1,
				point: 1,
				answer: 1,
			},
			{
				bab: 1,
				sub_bab: 1.1,
				point: 2,
				answer: 1,
			},
			{
				bab: 1,
				sub_bab: 1.1,
				point: 3,
				answer: 1,
			},
			{
				bab: 1,
				sub_bab: 1.1,
				point: 4,
				answer: 1,
			},
			{
				bab: 1,
				sub_bab: 1.1,
				point: 5,
				answer: 1,
			},
			{
				bab: 1,
				sub_bab: 1.1,
				point: 6,
				answer: 1,
			},
			{
				bab: 1,
				sub_bab: 1.1,
				point: 7,
				answer: 1,
			},
			{
				bab: 1,
				sub_bab: 1.1,
				point: 8,
				answer: 1,
			},
			{
				bab: 1,
				sub_bab: 1.1,
				point: 9,
				answer: 1,
			},
			{
				bab: 1,
				sub_bab: 1.1,
				point: 10,
				answer: 1,
			},
		],
		[
			{
				bab: 1,
				sub_bab: 1.2,
				point: 1,
				answer: 1,
			},
			{
				bab: 1,
				sub_bab: 1.2,
				point: 2,
				answer: 1,
			},
			{
				bab: 1,
				sub_bab: 1.2,
				point: 3,
				answer: 1,
			},
			{
				bab: 1,
				sub_bab: 1.2,
				point: 4,
				answer: 1,
			},
			{
				bab: 1,
				sub_bab: 1.2,
				point: 5,
				answer: 1,
			},
			{
				bab: 1,
				sub_bab: 1.2,
				point: 6,
				answer: 1,
			},
			{
				bab: 1,
				sub_bab: 1.2,
				point: 7,
				answer: 1,
			},
			{
				bab: 1,
				sub_bab: 1.2,
				point: 8,
				answer: 1,
			},
			{
				bab: 1,
				sub_bab: 1.2,
				point: 9,
				answer: 1,
			},
			{
				bab: 1,
				sub_bab: 1.2,
				point: 10,
				answer: 1,
			},
		],
		[
			{
				bab: 2,
				sub_bab: 2.1,
				point: 1,
				answer: 1,
			},
			{
				bab: 2,
				sub_bab: 2.1,
				point: 2,
				answer: 1,
			},
			{
				bab: 2,
				sub_bab: 2.1,
				point: 3,
				answer: 1,
			},
			{
				bab: 2,
				sub_bab: 2.1,
				point: 4,
				answer: 1,
			},
			{
				bab: 2,
				sub_bab: 2.1,
				point: 5,
				answer: 1,
			},
			{
				bab: 2,
				sub_bab: 2.1,
				point: 6,
				answer: 1,
			},
			{
				bab: 2,
				sub_bab: 2.1,
				point: 7,
				answer: 1,
			},
			{
				bab: 2,
				sub_bab: 2.1,
				point: 8,
				answer: 1,
			},
			{
				bab: 2,
				sub_bab: 2.1,
				point: 9,
				answer: 1,
			},
			{
				bab: 2,
				sub_bab: 2.1,
				point: 10,
				answer: 1,
			},
		],
		[
			{
				bab: 2,
				sub_bab: 2.2,
				point: 1,
				answer: 2,
			},
			{
				bab: 2,
				sub_bab: 2.2,
				point: 2,
				answer: 2,
			},
			{
				bab: 2,
				sub_bab: 2.2,
				point: 3,
				answer: 2,
			},
			{
				bab: 2,
				sub_bab: 2.2,
				point: 4,
				answer: 2,
			},
			{
				bab: 2,
				sub_bab: 2.2,
				point: 5,
				answer: 2,
			},
			{
				bab: 2,
				sub_bab: 2.2,
				point: 6,
				answer: 2,
			},
			{
				bab: 2,
				sub_bab: 2.2,
				point: 7,
				answer: 2,
			},
			{
				bab: 2,
				sub_bab: 2.2,
				point: 8,
				answer: 2,
			},
			{
				bab: 2,
				sub_bab: 2.2,
				point: 9,
				answer: 2,
			},
			{
				bab: 2,
				sub_bab: 2.2,
				point: 10,
				answer: 2,
			},
		],
		[
			{
				bab: 3,
				sub_bab: 3.1,
				point: 1,
				answer: 1,
			},
			{
				bab: 3,
				sub_bab: 3.1,
				point: 2,
				answer: 1,
			},
			{
				bab: 3,
				sub_bab: 3.1,
				point: 3,
				answer: 1,
			},
			{
				bab: 3,
				sub_bab: 3.1,
				point: 4,
				answer: 1,
			},
			{
				bab: 3,
				sub_bab: 3.1,
				point: 5,
				answer: 1,
			},
			{
				bab: 3,
				sub_bab: 3.1,
				point: 6,
				answer: 1,
			},
			{
				bab: 3,
				sub_bab: 3.1,
				point: 7,
				answer: 1,
			},
			{
				bab: 3,
				sub_bab: 3.1,
				point: 8,
				answer: 1,
			},
		],
		[
			{
				bab: 3,
				sub_bab: 3.2,
				point: 1,
				answer: 1,
			},
			{
				bab: 3,
				sub_bab: 3.2,
				point: 2,
				answer: 1,
			},
			{
				bab: 3,
				sub_bab: 3.2,
				point: 3,
				answer: 1,
			},
			{
				bab: 3,
				sub_bab: 3.2,
				point: 4,
				answer: 1,
			},
			{
				bab: 3,
				sub_bab: 3.2,
				point: 5,
				answer: 1,
			},
			{
				bab: 3,
				sub_bab: 3.2,
				point: 6,
				answer: 1,
			},
			{
				bab: 3,
				sub_bab: 3.2,
				point: 7,
				answer: 1,
			},
		],
		[
			{
				bab: 4,
				sub_bab: 4.1,
				point: 1,
				answer: 1,
			},
			{
				bab: 4,
				sub_bab: 4.1,
				point: 2,
				answer: 1,
			},
			{
				bab: 4,
				sub_bab: 4.1,
				point: 3,
				answer: 1,
			},
			{
				bab: 4,
				sub_bab: 4.1,
				point: 4,
				answer: 1,
			},
			{
				bab: 4,
				sub_bab: 4.1,
				point: 5,
				answer: 1,
			},
			{
				bab: 4,
				sub_bab: 4.1,
				point: 6,
				answer: 1,
			},
			{
				bab: 4,
				sub_bab: 4.1,
				point: 7,
				answer: 1,
			},
		],
		[
			{
				bab: 4,
				sub_bab: 4.2,
				point: 1,
				answer: 1,
			},
			{
				bab: 4,
				sub_bab: 4.2,
				point: 2,
				answer: 1,
			},
			{
				bab: 4,
				sub_bab: 4.2,
				point: 3,
				answer: 1,
			},
			{
				bab: 4,
				sub_bab: 4.2,
				point: 4,
				answer: 1,
			},
			{
				bab: 4,
				sub_bab: 4.2,
				point: 5,
				answer: 1,
			},
			{
				bab: 4,
				sub_bab: 4.2,
				point: 6,
				answer: 1,
			},
			{
				bab: 4,
				sub_bab: 4.2,
				point: 7,
				answer: 1,
			},
			{
				bab: 4,
				sub_bab: 4.2,
				point: 8,
				answer: 1,
			},
		],
		[
			{
				bab: 5,
				sub_bab: 5.1,
				point: 1,
				answer: 1,
			},
			{
				bab: 5,
				sub_bab: 5.1,
				point: 2,
				answer: 1,
			},
			{
				bab: 5,
				sub_bab: 5.1,
				point: 3,
				answer: 1,
			},
			{
				bab: 5,
				sub_bab: 5.1,
				point: 4,
				answer: 1,
			},
			{
				bab: 5,
				sub_bab: 5.1,
				point: 5,
				answer: 1,
			},
			{
				bab: 5,
				sub_bab: 5.1,
				point: 6,
				answer: 1,
			},
			{
				bab: 5,
				sub_bab: 5.1,
				point: 7,
				answer: 1,
			},
			{
				bab: 5,
				sub_bab: 5.1,
				point: 8,
				answer: 1,
			},
			{
				bab: 5,
				sub_bab: 5.1,
				point: 9,
				answer: 1,
			},
			{
				bab: 5,
				sub_bab: 5.1,
				point: 10,
				answer: 1,
			},
			{
				bab: 5,
				sub_bab: 5.1,
				point: 11,
				answer: 1,
			},
			{
				bab: 5,
				sub_bab: 5.1,
				point: 12,
				answer: 1,
			},
			{
				bab: 5,
				sub_bab: 5.1,
				point: 13,
				answer: 1,
			},
			{
				bab: 5,
				sub_bab: 5.1,
				point: 14,
				answer: 1,
			},
			{
				bab: 5,
				sub_bab: 5.1,
				point: 15,
				answer: 1,
			},
		],
		[
			{
				bab: 6,
				sub_bab: 6.1,
				point: 1,
				answer: 1,
			},
			{
				bab: 6,
				sub_bab: 6.1,
				point: 2,
				answer: 1,
			},
			{
				bab: 6,
				sub_bab: 6.1,
				point: 3,
				answer: 1,
			},
			{
				bab: 6,
				sub_bab: 6.1,
				point: 4,
				answer: 1,
			},
			{
				bab: 6,
				sub_bab: 6.1,
				point: 5,
				answer: 1,
			},
			{
				bab: 6,
				sub_bab: 6.1,
				point: 6,
				answer: 1,
			},
			{
				bab: 6,
				sub_bab: 6.1,
				point: 7,
				answer: 1,
			},
			{
				bab: 6,
				sub_bab: 6.1,
				point: 8,
				answer: 1,
			},
			{
				bab: 6,
				sub_bab: 6.1,
				point: 9,
				answer: 1,
			},
			{
				bab: 6,
				sub_bab: 6.1,
				point: 10,
				answer: 1,
			},
			{
				bab: 6,
				sub_bab: 6.1,
				point: 11,
				answer: 1,
			},
			{
				bab: 6,
				sub_bab: 6.1,
				point: 12,
				answer: 1,
			},
			{
				bab: 6,
				sub_bab: 6.1,
				point: 13,
				answer: 1,
			},
			{
				bab: 6,
				sub_bab: 6.1,
				point: 14,
				answer: 1,
			},
			{
				bab: 6,
				sub_bab: 6.1,
				point: 15,
				answer: 1,
			},
		],
	];

	const automation = async () => {
		try {
			const results = [];
			for (const assessments of dummy) {
				for (const assessment of assessments) {
					const response = await fetch(
						`${process.env.NEXT_PUBLIC_BASE_URL}/api/point?bab=${assessment.bab}&sub_bab=${assessment.sub_bab}&point=${assessment.point}&answer=${assessment.answer}`,
						{
							method: "POST",
							headers: { Authorization: `Bearer ${token}` },
						},
					);
					// if (!response.ok) {
					// 	throw new Error("Failed to submit data");
					// }
					const result = await response.json();
					console.log(result);

					if (result.success) {
						results.push(result.data);
					} else {
						throw new Error("API call unsuccessful");
					}
				}
			}

			console.log(results);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="flex flex-col mt-5 gap-5">
			<p className="text-danger text-justify">
				Dengan ini menyatakan bahwa saya telah mengisi assesment ini dengan
				itikad baik dan sepenuh hati. Saya berkomitmen untuk memberikan jawaban
				yang sejelas dan seakurat mungkin, tanpa menggunakan bantuan pihak lain
				atau materi yang tidak diizinkan. Kejujuran saya dalam mengisi laporan
				ini adalah landasan untuk pengembangan diri saya.
			</p>
			<div className="flex flex-row items-center justify-between">
				<Checkbox isSelected={isSelected} onValueChange={setIsSelected}>
					Saya setuju dengan pernyataan diatas
				</Checkbox>
				<Button
					color="success"
					className="text-white"
					onClick={handleSubmit}
					isDisabled={!isSelected}
				>
					Submit
				</Button>
				<Button type="button" onClick={automation}>
					Automation Assesment
				</Button>
			</div>
		</div>
	);
}
