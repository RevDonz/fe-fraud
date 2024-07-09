"use client";
import type { DetailAssesmentWithKey } from "@/types/assesment";
import { forwardRef } from "react";

interface PrintComponentProps {
	token: string;
	assesmentKey: string;
	data?: DetailAssesmentWithKey[];
}

export const PrintComponent = forwardRef<HTMLDivElement, PrintComponentProps>(
	({ assesmentKey, token, data }, ref) => {
		return (
			<div ref={ref}>
				<p>This is the content to print</p>
				<p>Key: {assesmentKey}</p>
				<p>Data:</p>
			</div>
		);
	},
);
