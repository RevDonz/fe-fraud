import { z } from "zod";

export const assesmentSchema = z.object({
	assesment: z.array(
		z.object({
			bab: z.coerce.number(),
			sub_bab: z.coerce.number(),
			point: z.coerce.number(),
			answer: z.coerce
				.number()
				.min(1, { message: "Jawaban tidak boleh kosong" }),
			file: z.any().optional(),
		}),
	),
});

export const reviewAssesmentSchema = z.object({
	id_assesment: z.string(),
	sub_bab: z.coerce.number(),
	skor: z.array(z.string()),
});
