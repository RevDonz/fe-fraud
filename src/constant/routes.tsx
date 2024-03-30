export const Routes = [
	{
		name: "Accounts",
		url: "/dashboard/accounts",
		role: ["super admin"],
	},
	{
		name: "Data Staff",
		url: "/dashboard/data-staff",
		role: ["admin"],
	},
	{
		name: "Dashboard",
		url: "/dashboard",
		role: ["admin", "super admin"],
	},
	{
		name: "Login History",
		url: "/dashboard/login-history",
		role: ["admin"],
	},
	{
		name: "Fraud Detection",
		url: "/dashboard/fraud-detection",
		role: ["admin"],
	},
	{
		name: "Fraud Assesment History",
		url: "/dashboard/fraud-assesment/history",
		role: ["admin"],
	},
	{
		name: "Fraud Assesment History",
		url: "/dashboard/fraud-assesment/create",
		role: ["admin"],
	},
	{
		name: "Fraud Assesment",
		url: "/dashboard/fraud-assesment",
		role: ["admin"],
	},
];
