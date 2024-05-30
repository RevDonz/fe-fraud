import type { StaffType } from "@/types/entity";

// Get All Assesment History
export const getAllStaff = async (token: string): Promise<StaffType[]> => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/staff`,
		{
			headers: { Authorization: `Bearer ${token}` },
		},
	);

	const result = await response.json();
	if (result.data === null) result.data = [];

	return result.data;
};
