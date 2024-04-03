"use client";

import { useQuery } from "@tanstack/react-query";

export const getDataAssesment = (token: string) => {
	return useQuery({
		queryKey: ["fraud-history"],
		queryFn: async () => {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/api/assessments`,
				{
					headers: { Authorization: `Bearer ${token}` },
				},
			);

			const result = await response.json();
			if (result.data === null) result.data = [];

			return result.data;
		},
	});
};
