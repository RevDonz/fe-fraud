export type StaffType = {
	id: string;
	name: string;
	email: string;
	role: string;
	status: string;
};

export const DataStaff = [
	{
		id: "1",
		name: "Reva Doni Aprilio",
		email: "doni.staff@gmail.com",
		role: "staff",
		status: "aktif",
	},
	{
		id: "2",
		name: "Reva Doni Aprilio",
		email: "doni.staff@gmail.com",
		status: "nonaktif",
		role: "staff",
	},
	{
		id: "3",
		name: "Reva Doni Aprilio",
		email: "doni.staff@gmail.com",
		status: "aktif",
		role: "staff",
	},
	{
		id: "4",
		name: "Reva Doni Aprilio",
		email: "doni.staff@gmail.com",
		status: "aktif",
		role: "staff",
	},
	{
		id: "5",
		name: "Reva Doni Aprilio",
		email: "doni.staff@gmail.com",
		status: "aktif",
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
		key: "status",
		label: "AKSI",
	},
];
