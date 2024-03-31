import { z } from "zod";

export const loginSchema = z.object({
	username: z
		.string({
			required_error: "Username is required",
		})
		.min(1, "Username should not be empty"),
	password: z
		.string({
			required_error: "Password is required",
		})
		.min(8, "Password should not less than 8 characters"),
	// rememberMe: z.boolean().default(false),
});
