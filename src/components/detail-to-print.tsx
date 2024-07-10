"use client";
import { ListSubBab } from "@/constant/assesment";
import { getAssesmentSubBabByKey } from "@/lib/assesment";
import { Card } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";

interface PrintComponentProps {
	token: string;
	assesmentKey: string;
}

export const PrintComponent = ({
	assesmentKey,
	token,
}: PrintComponentProps) => {
	const fetchAssesmentData = async (token: string, assesmentKey: string) => {
		const results = [];
		for (let index = 0; index < ListSubBab.length; index++) {
			const subBab = ListSubBab[index];
			const response = await getAssesmentSubBabByKey(
				token,
				assesmentKey,
				subBab.toString(),
			);

			if (response) {
				results.push(response);
			} else {
				throw new Error("Failed to get data");
			}
		}
		return results;
	};

	const useAssesmentData = (token: string, assesmentKey: string) => {
		return useQuery({
			queryKey: ["assesmentData", assesmentKey],
			queryFn: () => fetchAssesmentData(token, assesmentKey),
		});
	};

	const {
		data: dataToPrint,
		isLoading,
		error,
	} = useAssesmentData(token, assesmentKey);

	if (isLoading)
		return (
			<div className="min-h-screen w-full flex flex-col items-center justify-center">

				<p>Loading...</p>
			</div>
		);
	if (error) return <p>Error: {error.message}</p>;

	return (
	
		<div className="flex flex-col w-full max-w-screen-xl mx-auto px-6 py-10 gap-5">
			<div className="flex items-center gap-5">
				<p className="text-2xl font-semibold">Fraud Assesment</p>
			</div>
			<Card className="p-3">

      </Card>
		</div>
	);
};
