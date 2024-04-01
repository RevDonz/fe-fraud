export type MenuItem = {
	name: string;
	url: string;
};

export type MenuList = {
	[key: string]: MenuItem[];
};

export const ListMenuNavbar: MenuList = {
	landingPage: [
		{
			name: "Home",
			url: "/#home",
		},
		{
			name: "Fitur Utama",
			url: "/#fitur-utama",
		},
		{
			name: "Tentang Kami",
			url: "/#tentang",
		},
		{
			name: "Hubungi Kami",
			url: "/#call",
		},
	],
	admin: [
		{
			name: "Dashboard",
			url: "/dashboard",
		},
		{
			name: "Fraud Assesment",
			url: "/dashboard/fraud-assesment/history",
		},
		{
			name: "Fraud Detection",
			url: "/dashboard/report",
		},
		{
			name: "Data Staff",
			url: "/dashboard/data-staff",
		},
		{
			name: "Riwayat Login",
			url: "/dashboard/login-history",
		},
	],
	staff: [
		{
			name: "Dashboard",
			url: "/dashboard",
		},
		{
			name: "Fraud Assesment",
			url: "/dashboard/fraud-assesment/history",
		},
		{
			name: "Fraud Detection",
			url: "/dashboard/report",
		},
		{
			name: "Data Staff",
			url: "/dashboard/data-staff",
		},
		{
			name: "Riwayat Login",
			url: "/dashboard/login-history",
		},
	],
	reviewer: [
		{
			name: "Dashboard",
			url: "/dashboard",
		},
		{
			name: "Fraud Assesment",
			url: "/dashboard/fraud-assesment/history",
		},
	],
	superadmin: [
		{
			name: "Dashboard",
			url: "/dashboard",
		},
		{
			name: "Kelola Akun",
			url: "/dashboard/accounts",
		},
	],
};
