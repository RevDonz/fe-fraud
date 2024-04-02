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
		url: "/dashboard/undefined",
		role: ["admin", "super admin", "staff", "reviewer"],
	},
	{
		name: "Login History",
		url: "/dashboard/login-history",
		role: ["admin", "staff"],
	},
	{
		name: "Fraud Detection",
		url: "/dashboard/fraud-detection",
		role: ["admin", "staff"],
	},
	{
		name: "Fraud Assesment History",
		url: "/dashboard/fraud-assesment/history",
		role: ["admin", "staff", "reviewer"],
	},
	{
		name: "Fraud Assesment History",
		url: "/dashboard/fraud-assesment/create",
		role: ["admin", "staff", "reviewer"],
	},
	{
		name: "Fraud Assesment",
		url: "/dashboard/fraud-assesment",
		role: ["admin"],
	},
];
