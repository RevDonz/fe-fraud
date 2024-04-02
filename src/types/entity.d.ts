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
