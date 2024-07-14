import type { FraudDetectionFull, FraudDetectionType } from "@/types/detection";

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

export const getDetectionByKey = async (
	token: string,
	key: string,
): Promise<FraudDetectionFull> => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/report/${key}`,
		{
			headers: { Authorization: `Bearer ${token}` },
		},
	);

	const result = await response.json();
	if (result.data === null) result.data = [];

	return result.data;
};
