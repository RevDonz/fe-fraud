import { z } from "zod";

export const assesmentSchema = z.object({
	assesment: z.array(
		z.object({
			bab: z.coerce.number(),
			sub_bab: z.coerce.number(),
			point: z.coerce.number(),
			answer: z.enum(["1", "0.5", "0"], {
				invalid_type_error: "Jawaban tidak boleh kosong",
			}),
			file: z.any().optional(),
		}),
	),
});

export const reviewAssesmentSchema = z.object({
	id_assessment: z.string(),
	sub_bab: z.coerce.string(),
	skor: z
		.array(z.string({ required_error: "Nilai tidak boleh kosong" }))
		.optional(),
	tepat: z.array(z.boolean()).optional(),
	result: z.array(z.string()),
});
