import type { EntityType } from "@/types/entity";

export const getEntity = async (token: string): Promise<EntityType> => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/entitas`, {
		method: "GET",
		headers: { Authorization: `Bearer ${token}` },
	});

	const result = await response.json();

	return result.data;
};
