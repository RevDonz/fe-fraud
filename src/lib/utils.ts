import type { FraudHistoryType } from "@/types/assesment";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const compareDates = (a: FraudHistoryType, b: FraudHistoryType) => {
	const dateA = new Date(a.tanggal_mulai).getTime();
	const dateB = new Date(b.tanggal_mulai).getTime();
	return dateB - dateA;
};
