export const getAssesmentHistory = async (token: string) => {
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

export const startAssesment = async (token: string) => {
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
		throw new Error("error");
	}
};
