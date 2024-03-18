"use client";

import Datatable from "@/components/data-table";
import {
	Button,
	Card,
	CardBody,
	Input,
	Select,
	SelectItem,
	Tab,
	Tabs,
} from "@nextui-org/react";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function FraudAssesmentCard() {
	const [isVisible, setIsVisible] = useState(false);
	const toggleVisibility = () => setIsVisible(!isVisible);

	return (
		<Card className="p-3">
			<Tabs aria-label="Options" color="primary" variant="bordered">
				<Tab key="history" title="Riwayat Fraud Assesment">
					<Datatable />
				</Tab>
				<Tab key="fill" title="Isi Fraud Assesment">
					<Card className="p-3">
						<CardBody className="flex flex-col gap-5">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
								<Input
									autoFocus
									label="Nama"
									placeholder=" "
									type="text"
									variant="bordered"
									labelPlacement="outside"
								/>
								<Input
									label="Email"
									placeholder=" "
									type="email"
									variant="bordered"
									labelPlacement="outside"
								/>
								<Input
									endContent={
										<button
											className="focus:outline-none"
											type="button"
											onClick={toggleVisibility}
										>
											{isVisible ? (
												<Eye className="text-default-400" />
											) : (
												<EyeOff className="text-default-400" />
											)}
										</button>
									}
									label="Password"
									placeholder=" "
									type={isVisible ? "text" : "password"}
									variant="bordered"
									labelPlacement="outside"
								/>

								<Select
									label="Role"
									labelPlacement="outside"
									placeholder=" "
									variant="bordered"
								>
									<SelectItem key={"admin"} value={"admin"}>
										Admin
									</SelectItem>
									<SelectItem key={"staff"} value={"staff"}>
										Staff
									</SelectItem>
								</Select>
							</div>
							<Button color="primary" className="max-w-xs">
								Tambah Akun
							</Button>
						</CardBody>
					</Card>
				</Tab>
			</Tabs>
		</Card>
	);
}
