import { z } from "zod";

export const registerSchema = z.object({
	full_name: z
		.string({
			required_error: "Required",
		})
		.min(1, "Should not be empty"),
	role: z
		.string({
			required_error: "Required",
		})
		.min(1, "Should not be empty"),
	phone: z
		.string({
			required_error: "Required",
		})
		.min(1, "Should not be empty"),
	institution_name: z
		.string({
			required_error: "Required",
		})
		.min(1, "Should not be empty"),
	institution_address: z
		.string({
			required_error: "Required",
		})
		.min(1, "Should not be empty"),
	institution_phone: z
		.string({
			required_error: "Required",
		})
		.min(1, "Should not be empty"),
	institution_email: z
		.string({
			required_error: "Required",
		})
		.min(1, "Should not be empty"),
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
});
