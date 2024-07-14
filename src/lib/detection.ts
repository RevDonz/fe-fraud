import type { FraudDetectionType } from "@/types/detection";

export const getDetectionHistory = async (
	token: string,
): Promise<FraudDetectionType[]> => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/report`,
		{
			headers: { Authorization: `Bearer ${token}` },
		},
	);

	const result = await response.json();
	if (result.data === null) result.data = [];

	const data = result.data.map((history: FraudDetectionType) => {
		return {
			...history,
			id: history.data_key,
		};
	});

	return data;
};
