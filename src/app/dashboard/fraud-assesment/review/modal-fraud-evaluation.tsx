"use client";
import { startEvaluationAssesment } from "@/lib/assesment";
import {
	Button,
	Checkbox,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ModalEvaluation({
	token,
	assesmentKey,
}: { token: string; assesmentKey: string }) {
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
	const [isChecked, setIsChecked] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleStart = async (key: string) => {
		setIsLoading(true);
		const res = await startEvaluationAssesment(token, key);
		if (res) {
			setIsLoading(false);
			onClose();
			return router.push(`/dashboard/fraud-assesment/review/${key}`);
		}
	};

	return (
		<>
			<Button color="primary" size="sm" onClick={onOpen} type="button">
				Beri Nilai
			</Button>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				hideCloseButton
				size="xl"
				backdrop="blur"
			>
				<ModalContent>
					<ModalHeader className="flex flex-col gap-1">
						Penilaian Fraud Assesment
					</ModalHeader>
					<ModalBody>
						<p className="text-danger-500">
							Dengan ini menyatakan bahwa saya menilai assessment ini dengan
							itikad baik dan sepenuh hati. Saya berkomitmen untuk memberikan
							penilaian yang sejelas dan seakurat mungkin, tanpa menggunakan
							bantuan pihak lain atau materi yang tidak diizinkan. Kejujuran
							saya dalam menilai assessment ini adalah landasan untuk
							pengembangan diri saya.
						</p>
					</ModalBody>
					<ModalFooter className="flex items-center justify-between">
						<Checkbox isSelected={isChecked} onValueChange={setIsChecked}>
							Saya setuju dengan pernyataan diatas
						</Checkbox>
						<Button
							color="primary"
							isDisabled={!isChecked}
							isLoading={isLoading}
							onClick={() => handleStart(assesmentKey)}
						>
							Mulai Penilaian
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
