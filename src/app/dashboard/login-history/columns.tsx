export type LoginHistoryType = {
	id: string;
	name: string;
	email: string;
	role: string;
	time: string;
};

export const DataLoginHistory: LoginHistoryType[] = [
	{
		id: "1",
		name: "Reva Doni Aprilio",
		email: "doni.staff@gmail.com",
		role: "staff",
		time: new Date().getTime().toString(),
	},
	{
		id: "2",
		name: "Reva Doni Aprilio",
		email: "doni.staff@gmail.com",
		time: new Date().toLocaleDateString(),
		role: "staff",
	},
	{
		id: "3",
		name: "Reva Doni Aprilio",
		email: "doni.staff@gmail.com",
		time: new Date().toLocaleDateString(),
		role: "staff",
	},
	{
		id: "4",
		name: "Reva Doni Aprilio",
		email: "doni.staff@gmail.com",
		time: new Date().toLocaleDateString(),
		role: "staff",
	},
	{
		id: "5",
		name: "Reva Doni Aprilio",
		email: "doni.staff@gmail.com",
		time: new Date().toLocaleDateString(),
		role: "staff",
	},
];

export const columns = [
	{
		key: "name",
		label: "NAMA AKUN",
	},
	{
		key: "email",
		label: "EMAIL",
	},
	{
		key: "role",
		label: "ROLE",
	},
	{
		key: "date",
		label: "TANGGAL & WAKTU",
	},
];
