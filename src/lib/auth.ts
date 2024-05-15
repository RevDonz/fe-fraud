import {
	getServerSession,
	type AuthOptions,
	type DefaultSession,
	type DefaultUser,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
	interface Session extends DefaultSession {
		user: {
			role: string;
			limit_access: string;
			admin_id: string;
			accessToken: string;
			refreshToken: string;
			username: string;
		} & DefaultSession["user"];
	}

	interface User extends DefaultUser {
		username: string;
		fullName: string;
		email: string;
		role: string;
		accessToken: string;
		refreshToken: string;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		username: string;
		role: string;
		accessToken: string;
		refreshToken: string;
	}
}

export const authOptions: AuthOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				username: { label: "Username", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				try {
					const loginRes = await fetch(
						`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth`,
						{
							method: "POST",
							headers: {
								"Content-Type": "application/x-www-form-urlencoded",
							},
							body: new URLSearchParams(credentials).toString(),
						},
					);

					const loginData = await loginRes.json();
					if (!loginRes.ok || !loginData?.success) {
						throw new Error(loginData?.message ?? "Invalid credentials");
					}

					const { access_token: token, refresh_token: refreshToken } =
						loginData.data;

					if (!token) {
						throw new Error("Failed to retrieve access token");
					}

					const userRes = await fetch(
						`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth`,
						{
							method: "GET",
							headers: {
								Authorization: `Bearer ${token}`,
								"Content-Type": "application/json",
							},
						},
					);

					const userData = await userRes.json();
					if (!userRes.ok || !userData?.success) {
						throw new Error(userData?.message ?? "Failed to fetch user data");
					}

					const { username, role, email, full_name: fullName } = userData.data;

					return {
						id: token,
						username,
						role,
						email,
						fullName,
						accessToken: token,
						refreshToken,
					};
				} catch (error) {
					throw new Error("An error occurred during authentication");
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.accessToken = user.accessToken;
				token.refreshToken = user.refreshToken;
				token.role = user.role;
				token.username = user.username;
				token.name = user.fullName;
				token.email = user.email;
			}
			return token;
		},
		async session({ session, token }) {
			session.user.accessToken = token.accessToken;
			session.user.refreshToken = token.refreshToken;
			session.user.role = token.role;
			session.user.username = token.username;
			return session;
		},
	},
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "/auth/login",
	},
	secret: process.env.NEXTAUTH_SECRET,
};

export const getServerAuthSession = () => getServerSession(authOptions);
