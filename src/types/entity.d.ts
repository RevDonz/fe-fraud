export type EntityType = {
	name: string;
	address: string;
	phone: string;
	email: string;
	data_key: string;
};

export type AdminType = {
	institusi: EntityType;
	id: string;
	email: string;
	is_active: boolean;
	is_show: boolean;
};

export type StaffType = {
	full_name: string;
	email: string;
	role: string;
	status: boolean;
	id: string;
	data_key: string;
};

export type LoginHistoryType = {
	id: string;
	nama: string;
	email: string;
	role: string;
	tanggal: string;
	event: string;
};
