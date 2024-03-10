"use client";
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
import { useEffect, useState } from "react";

const ModalAssesment = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [isChecked, setIsChecked] = useState(false);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		onOpen();
	}, []);

	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			isDismissable={false}
			hideCloseButton
			size="xl"
			backdrop="blur"
		>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className="flex flex-col gap-1">
							Assesment Risiko Keuangan
						</ModalHeader>
						<ModalBody>
							<p className="text-danger-500">
								Dengan ini menyatakan bahwa saya mengisi assessment ini dengan
								itikad baik dan sepenuh hati. Saya berkomitmen untuk memberikan
								jawaban yang sejelas dan seakurat mungkin, tanpa menggunakan
								bantuan pihak lain atau materi yang tidak diizinkan. Kejujuran
								saya dalam mengisi assessment ini adalah landasan untuk
								pengembangan diri saya.
							</p>
						</ModalBody>
						<ModalFooter className="flex items-center justify-between">
							<Checkbox isSelected={isChecked} onValueChange={setIsChecked}>
								Saya setuju dengan pernyataan diatas
							</Checkbox>
							<Button color="primary" onPress={onClose} isDisabled={!isChecked}>
								Mulai Assesment
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default ModalAssesment;
