export const Routes = [
	{
		url: "/dashboard/accounts",
		role: ["super admin"],
	},
	{
		url: "/dashboard/data-staff",
		role: ["admin"],
	},
	{
		url: "/dashboard",
		role: ["admin", "super admin", "staff", "reviewer"],
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
		url: "/dashboard/fraud-assesment/grade",
		role: ["reviewer"],
	},
	{
		url: "/dashboard/fraud-assesment",
		role: ["admin"],
	},
];
