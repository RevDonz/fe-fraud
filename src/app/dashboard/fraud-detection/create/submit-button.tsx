
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
			</div>
		</div>
	);
}
