import { z } from "zod";

export const detectionSchema = z.object({
	revenue_1: z.number().nonnegative(),
	cogs_1: z.number().nonnegative(),
	sgae_1: z.number().nonnegative(),
	depreciation_1: z.number().nonnegative(),
	net_continuous_1: z.number().nonnegative(),
	account_receivables_1: z.number().nonnegative(),
	current_assets_1: z.number().nonnegative(),
	ppe_1: z.number().nonnegative(),
	securities_1: z.number().nonnegative(),
	total_asset_1: z.number().nonnegative(),
	total_ltd_1: z.number().nonnegative(),
	cash_flow_operate_1: z.number().nonnegative(),
	revenue_2: z.number().nonnegative(),
	cogs_2: z.number().nonnegative(),
	sgae_2: z.number().nonnegative(),
	depreciation_2: z.number().nonnegative(),
	net_continuous_2: z.number().nonnegative(),
	account_receivables_2: z.number().nonnegative(),
	current_assets_2: z.number().nonnegative(),
	ppe_2: z.number().nonnegative(),
	securities_2: z.number().nonnegative(),
	total_asset_2: z.number().nonnegative(),
	total_ltd_2: z.number().nonnegative(),
	cash_flow_operate_2: z.number().nonnegative(),
	tahun_1: z.number().int(),
	tahun_2: z.number().int(),
	id_institution: z.string(),
});

export const uploadFileSchema = z.object({
	file: z.any(),
});
