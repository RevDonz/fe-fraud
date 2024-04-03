import { z } from "zod";

export const assesmentSchema = z.object({
	assesment: z.array(
		z.object({
			bab: z.number(),
			sub_bab: z.number(),
			point: z.number(),
			answer: z.number(),
      file: z.any()
		}),
	),
});
