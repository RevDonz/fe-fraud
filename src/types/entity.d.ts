export type EntityType = {
	name: string;
	address: string;
	phone: string;
	email: string;
	key: string;
};

export type AdminType = {
	entity: EntityType;
	id: string;
	email: string;
	is_active: true;
};
