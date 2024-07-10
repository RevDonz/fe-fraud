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
	skor: string;
	proof?: ProofType;
};

export type ProofType = {
	id_user: string;
	url: string;
	file_name: string;
};

export interface AssesmentPoint {
	[key: string]: number;
}

export type DetailAssesment = {
	assessment: FraudHistoryType;
	point: AssesmentPoint;
};

export type DetailAssesmentWithKey = {
	assessment: FraudHistoryType;
	point: CurrentSubBab[];
};

export interface FraudHistoryType {
	id_institution: string;
	id_admin: string;
	id_reviewer_internal: string;
	id_reviewer_external: string;
	tanggal_mulai: string;
	tanggal_nilai: string;
	hasil_internal: number;
	hasil_external: number;
	is_done: boolean;
	data_key: string;
	id: string;
	admin: string;
	reviewer_internal: string;
	reviewer_external: string;
}

export type EvaluationAssesmentType = {
	id_assessment: string;
	sub_bab: string;
	skor: string[];
};
