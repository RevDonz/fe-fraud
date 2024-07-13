"use client";
import { submitEvaluation } from "@/lib/assesment";
import { Button, Checkbox } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function SubmitEvaluation({
	assessmentKey,
	token,
}: { assessmentKey: string; token: string }) {
	const [isSelected, setIsSelected] = useState(false);
	const router = useRouter();

	const handleSubmit = () => {
		const response = submitEvaluation(token as string, assessmentKey);
		toast.promise(response, {
			loading: "Loading..",
			success: () => {
				router.push("/dashboard/fraud-assesment/review");
				return "Berhasil";
			},
			error: (data) => {
				console.log(data);
				return "Lengkapi Penilaian!";
			},
		});
	};

	const anotherDummy = [
		{
			id_assessment: assessmentKey,
			sub_bab: "1.1",
			skor: ["1", "1", "0", "0", "0.5", "0", "0.5", "1", "1", "0"],
		},
		{
			id_assessment: assessmentKey,
			sub_bab: "1.2",
			skor: ["1", "0", "0.5", "1", "0", "1", "0.5", "1", "1", "1"],
		},
		{
			id_assessment: assessmentKey,
			sub_bab: "2.1",
			skor: ["0", "0.5", "0", "1", "0.5", "1", "0", "0", "0", "0"],
		},
		{
			id_assessment: assessmentKey,
			sub_bab: "2.2",
			skor: ["0", "1", "0", "1", "0", "0", "0", "1", "0", "0.5"],
		},
		{
			id_assessment: assessmentKey,
			sub_bab: "3.1",
			skor: ["0", "0", "0.5", "0.5", "0", "0", "1", "0"],
		},
		{
			id_assessment: assessmentKey,
			sub_bab: "3.2",
			skor: ["0", "1", "1", "0.5", "0", "0", "0.5"],
		},
		{
			id_assessment: assessmentKey,
			sub_bab: "4.1",
			skor: ["1", "0", "0.5", "0", "0.5", "0", "1"],
		},
		{
			id_assessment: assessmentKey,
			sub_bab: "4.2",
			skor: ["0.5", "0", "1", "0.5", "0", "0.5", "1", "1"],
		},
		{
			id_assessment: assessmentKey,
			sub_bab: "5.1",
			skor: [
				"0.5",
				"0.5",
				"0",
				"1",
				"1",
				"0.5",
				"1",
				"1",
				"0",
				"0.5",
				"0.5",
				"1",
				"1",
				"0.5",
				"0",
			],
		},
		{
			id_assessment: assessmentKey,
			sub_bab: "6.1",
			skor: [
				"0",
				"1",
				"1",
				"1",
				"1",
				"1",
				"0",
				"0",
				"0",
				"0",
				"0",
				"1",
				"0",
				"1",
				"0",
			],
		},
	];

	const dummy = [
		{
			id_assessment: assessmentKey,
			sub_bab: "1.1",
			skor: ["1", "0", "0", "0", "0", "0", "0", "1", "1", "0"],
		},
		{
			id_assessment: assessmentKey,
			sub_bab: "1.2",
			skor: ["1", "0", "0", "0", "0", "1", "0", "1", "1", "0"],
		},
		{
			id_assessment: assessmentKey,
			sub_bab: "2.1",
			skor: ["0", "0", "0", "1", "0", "1", "0", "0", "0", "0"],
		},
		{
			id_assessment: assessmentKey,
			sub_bab: "2.2",
			skor: ["0", "1", "0", "1", "0", "0", "0", "0", "0", "0"],
		},
		{
			id_assessment: assessmentKey,
			sub_bab: "3.1",
			skor: ["0", "0", "0", "0", "0", "0", "1", "0"],
		},
		{
			id_assessment: assessmentKey,
			sub_bab: "3.2",
			skor: ["0", "0", "1", "0", "0", "0", "0"],
		},
		{
			id_assessment: assessmentKey,
			sub_bab: "4.1",
			skor: ["1", "0", "0", "0", "0", "0", "1"],
		},
		{
			id_assessment: assessmentKey,
			sub_bab: "4.2",
			skor: ["0", "0", "1", "0", "0", "0", "1", "1"],
		},
		{
			id_assessment: assessmentKey,
			sub_bab: "5.1",
			skor: [
				"0",
				"0",
				"0",
				"1",
				"1",
				"0",
				"1",
				"1",
				"0",
				"0",
				"0",
				"1",
				"1",
				"0",
				"0",
			],
		},
		{
			id_assessment: assessmentKey,
			sub_bab: "6.1",
			skor: [
				"0",
				"1",
				"1",
				"1",
				"1",
				"1",
				"0",
				"0",
				"0",
				"0",
				"0",
				"1",
				"0",
				"1",
				"0",
			],
		},
	];

	const automation = async () => {
		try {
			const results = [];
			for (const assessment of anotherDummy) {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_BASE_URL}/api/assessments/evaluation`,
					{
						method: "POST",
						body: JSON.stringify(assessment),
						headers: {
							Authorization: `Bearer ${token}`,
							"Content-Type": "application/json",
						},
					},
				);

				const result = await response.json();
				console.log(result);

				if (result.success) {
					results.push(result.data);
				}
			}

			console.log(results);
		} catch (error) {
			console.log(error);
		}
	};
	const automation2 = async () => {
		try {
			const results = [];
			for (const assessment of dummy) {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_BASE_URL}/api/assessments/evaluation`,
					{
						method: "POST",
						body: JSON.stringify(assessment),
						headers: {
							Authorization: `Bearer ${token}`,
							"Content-Type": "application/json",
						},
					},
				);

				const result = await response.json();
				console.log(result);

				if (result.success) {
					results.push(result.data);
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
					Automation 1
				</Button>
				<Button type="button" onClick={automation2}>
					Automation 2
				</Button>
			</div>
		</div>
	);
}
