export type AssesmentType = {
	assesment: AssesmentAsnwerType[];
};

export type AssesmentAsnwerType = {
	bab: number;
	sub_bab: number;
	point: number;
	answer: number;
};

export type CurrentSubBab = {
	id_assessment: string;
	bab: string;
	sub_bab: string;
	point: number;
	answer: number;
	skor: number;
	proof?: ProofType;
};

export type ProofType = {
	id_user: string;
	url: string;
	file_name: string;
};

export type Assesments = {
	id_institution: string;
	id_admin: string;
	id_reviewer?: string;
	tanggal: string;
	hasil: number;
	selesai: boolean;
	key: string;
	nama_admin: string;
	nama_reviewer: string;
};

export interface AssesmentPoint {
	[key: string]: number;
}

export type DetailAssesment = {
	assesment: Assesments;
	point: AssesmentPoint;
};

export type FraudHistoryType = {
	id_institution: string;
	id_admin: string;
	id_reviewer_internal: string;
	id_reviewer_external: string;
	tanggal: string;
	hasil_internal: number;
	hasil_external: number;
	selesai: boolean;
	key: string;
	id: string;
	admin: string;
	reviewer_internal: string;
	reviewer_external: string;
};
