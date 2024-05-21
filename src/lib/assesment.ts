import type { FraudHistoryType } from "@/app/dashboard/fraud-assesment/history/column";
import type { CurrentSubBab } from "@/types/assesment";

// Get All Assesment History
export const getAssesmentHistory = async (
	token: string,
): Promise<FraudHistoryType[]> => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/assessments`,
		{
			headers: { Authorization: `Bearer ${token}` },
		},
	);

	const result = await response.json();
	if (result.data === null) result.data = [];

	return result.data;
};

// Check Activated Assesment
export const checkAssesment = async (token: string) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/assessment?sub_bab=1.1`,
		{
			method: "GET",
			headers: { Authorization: `Bearer ${token}` },
		},
	);

	const result = await response.json();

	return result.success;
};

// Start Assesment
export const startAssesment = async (token: string): Promise<boolean> => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/assessment`,
		{
			method: "POST",
			headers: { Authorization: `Bearer ${token}` },
		},
	);

	const result = await response.json();

	return result.success;
};

// Get Sub Bab Finished
export const getFinishedAssesment = async (token: string) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/assessments/progress`,
		{
			headers: { Authorization: `Bearer ${token}` },
		},
	);

	const result = await response.json();
	if (result.data === null) result.data = [];

	return result.data;
};

// Submit Finished Assesment
export const submitAssesment = async (token: string, id: string) => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/selesai?id_assessment=${id}`,
			{
				method: "POST",
				headers: { Authorization: `Bearer ${token}` },
			},
		);

		if (!response.ok) {
			throw new Error("Failed to submit data");
		}

		const result = await response.json();

		if (result.success) return result.data;

		return result;
	} catch (error) {
		console.log(error);

		throw new Error("error");
	}
};

// Get SubBab Current Assesment
export const getAssesmentSubBab = async (
	token: string,
	subBab: string,
): Promise<CurrentSubBab[]> => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/assessment?sub_bab=${subBab}`,
		{
			headers: { Authorization: `Bearer ${token}` },
		},
	);

	const result = await response.json();
	if (result.data === null) result.data = [];

	result.data.sort((a: CurrentSubBab, b: CurrentSubBab) => a.point - b.point);

	return result.data;
};

// Get Assesment need to be Evaluation
export const getEvaluationAssesment = async (
	token: string,
): Promise<FraudHistoryType[]> => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/assessments/list`,
		{
			headers: { Authorization: `Bearer ${token}` },
		},
	);

	const result = await response.json();
	if (result.data === null) result.data = [];

	return result.data;
};
