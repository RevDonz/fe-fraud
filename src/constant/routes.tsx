export const Routes = [
	{
		url: "/dashboard/accounts",
		role: ["super_admin"],
	},
	{
		url: "/dashboard/data-staff",
		role: ["admin"],
	},
	{
		url: "/dashboard",
		role: ["admin", "super_admin", "staff", "reviewer"],
	},
	{
		url: "/dashboard/login-history",
		role: ["admin", "staff"],
	},
	{
		url: "/dashboard/fraud-detection",
		role: ["admin", "staff"],
	},
	{
		url: "/dashboard/fraud-detection/detail",
		role: ["admin", "staff"],
	},
	{
		url: "/dashboard/fraud-assesment/history",
		role: ["admin", "staff"],
	},
	{
		url: "/dashboard/fraud-assesment/create",
		role: ["admin", "staff"],
	},
	{
		url: "/dashboard/fraud-assesment/detail",
		role: ["admin", "staff"],
	},
	{
		url: "/dashboard/fraud-assesment/review",
		role: ["reviewer"],
	},
	{
		url: "/dashboard/fraud-assesment",
		role: ["admin"],
	},
];
