import { DefaultUser } from "next-auth";

// export enum Role {
// 	admin = "admin",
// 	facilitator = "facilitator",
// 	webmaster = "webmaster",
// }

interface IUser extends DefaultUser {
	role?: Role | string;
	accessToken?: string;
	refreshToken?: string;
	phone?: number;
	expires_at?: Date;
}

export type UserAuthenticated = {
	success: boolean;
	code: number;
	message: string;
	data: {
		sub: string;
		role: string;
		exp: number;
		iat: number;
	};
};

declare module "next-auth" {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: IUser;
	}

	interface User extends IUser {}
}

declare module "next-auth/jwt" {
	interface JWT extends IUser {}
}
