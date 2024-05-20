export type EntityType = {
	name: string;
	address: string;
	phone: string;
	email: string;
	key: string;
};

export type AdminType = {
	institusi: EntityType;
	id: string;
	email: string;
	is_active: boolean;
};

export type StaffType = {
	full_name: string;
	email: string;
	role: string;
	status: boolean;
	id: string;
	key: string;
};
