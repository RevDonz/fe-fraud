export const Routes = [
	{
		name: "Accounts",
		url: "/accounts",
		role: ["superadmin"],
	},
	{
		name: "Data Staff",
		url: "/data-staff",
		role: ["admin"],
	},
	{
		name: "Dashboard",
		url: "/dashboard",
		role: ["admin", "superadmin"],
	},

	{
		name: "Login History",
		url: "/login-history",
		role: ["admin"],
	},
	{
		name: "Fraud Detection",
		url: "/fraud-detection",
		role: ["admin"],
	},
	{
		name: "Fraud Assesment",
		url: "/fraud-assesment",
		role: ["admin"],
	},
];
