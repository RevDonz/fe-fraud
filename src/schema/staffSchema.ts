import { z } from "zod";

export const staffSchema = z
	.object({
		full_name: z
			.string({
				required_error: "Required",
			})
			.min(1, "Nama tidak boleh kosong"),
		role: z
			.string({
				required_error: "Required",
			})
			.min(1, "Role tidak boleh kosong"),
		phone: z
			.string({
				required_error: "Required",
				invalid_type_error: "No. Telp isi dengan angka",
			})
			.min(1, " No. Telp tidak boleh kosong"),
		username: z
			.string({
				required_error: "Username is required",
			})
			.min(1, "Username tidak boleh kosong"),
		email: z
			.string({
				required_error: "Email is required",
			})
			.min(1, "Email tidak boleh kosong")
			.email("Email is invalid"),
		password: z
			.string({
				required_error: "Password is required",
			})
			.min(1, "Password tidak boleh kosong")
			.min(8, "Password tidak boleh kurang dari 8 karakter")
			.max(16, "Password tidak boleh lebih dari 16 karakter"),
		confirm_password: z.string(),
	})
	.refine((data) => data.password === data.confirm_password, {
		message: "Password tidak sama!",
		path: ["confirm_password"],
	});
