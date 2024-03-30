import { getServerSession, type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { addDays, isBefore } from "date-fns";

export const authOptions: AuthOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				username: { label: "username", type: "text" },
				password: { label: "password", type: "password" },
			},
			async authorize(credentials) {
				const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth`, {
					method: "POST",
					// body: JSON.stringify({
					// 	email: credentials?.username,
					// 	password: credentials?.password,
					// }),
					body: new URLSearchParams(credentials).toString(),
					headers: { "Content-Type": "application/x-www-form-urlencoded" },
				});
				const parsedResponse = await res.json();

				if (!res.ok) {
					console.error(parsedResponse);
					throw new Error(parsedResponse.message);
				}

				const { access_token, refresh_token } = parsedResponse.data;

				return {
					id: access_token,
					refreshToken: refresh_token,
				};
			},
		}),
	],
	callbacks: {
		jwt: async ({ token, user }) => {
			if (user) {
				return {
					...token,
					...user,
					expires_at: addDays(new Date(), 7),
					berhasil: "",
				};
			}

			if (token.expires_at && isBefore(new Date(), token.expires_at)) {
				return token;
			}

			// 	const res = await fetch(`${env.SERVER_BASE_URL}/auth/refresh`, {
			// 		method: "POST",
			// 		body: JSON.stringify({
			// 			refresh_token: token.refreshToken,
			// 		}),
			// 		headers: { "Content-Type": "application/json" },
			// 	});
			// 	const parsedResponse = await res.json();

			// 	if (!res.ok) {
			// 		console.error(parsedResponse);
			// 		throw new Error(parsedResponse.message);
			// 	}

			return {
				...token,
				// id: parsedResponse.data.access_token,
				// refreshToken: parsedResponse.data.refresh_token,
				expires_at: addDays(new Date(), 7),
			};
		},
		session: async ({ session, token }) => {
			const fetchData = async () => {
				const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth`, {
					headers: { Authorization: `Bearer ${token.id}` },
				});
				const data = await res.json();

				return data;
			};

			try {
				const { data } = await fetchData();

				session = {
					...session,
					user: {
						id: data.key,
						name: data.username,
						email: data.email,
						role: data.role,
						accessToken: token.sub,
						refreshToken: token.refreshToken,
					},
				};
			} catch (error) {
				console.log(`error session ${error}`);
			}

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
