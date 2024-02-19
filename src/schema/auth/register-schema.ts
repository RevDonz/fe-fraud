import { z } from "zod";

export const registerSchema = z.object({
	username: z
		.string({
			required_error: "Username is required",
		})
		.min(1, "Username should not be empty"),
	email: z
		.string({
			required_error: "Email is required",
		})
		.min(1, "Email should not be empty")
		.email("Email is invalid"),
	password: z
		.string({
			required_error: "Password is required",
		})
		.min(8, "Password should not less than 8 characters")
		.max(16, "Password should not more than 16 characters"),
	// rememberMe: z.boolean().default(false),
});
