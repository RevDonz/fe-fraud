import type { AdminType } from "@/types/entity";

export const getAllAdmin = async (token: string): Promise<AdminType[]> => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin`,
			{
				headers: { Authorization: `Bearer ${token}` },
			},
		);

		if (!response.ok) {
			throw new Error(`Failed to fetch admin data: ${response.status}`);
		}

		const result = await response.json();
		if (result.data === null) result.data = [];

		return result.data;
	} catch (error) {
		throw new Error("Failed to fetch admin data");
	}
};
