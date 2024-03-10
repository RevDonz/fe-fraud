import { getToken } from "next-auth/jwt";
import { NextResponse, type NextMiddleware } from "next/server";
import { Routes } from "./constant/routes";

export const middleware: NextMiddleware = async (request) => {
	const pathname = request.nextUrl.pathname;

	const token = await getToken({
		req: request,
		secret: process.env.NEXTAUTH_SECRET,
	});

	// if (token && ["/auth/login", "/auth/register"].includes(pathname)) {
	// 	return NextResponse.redirect(new URL("/home", request.url));
	// }

	if (!token && !["/auth/login", "/auth/register", "/"].includes(pathname)) {
		return NextResponse.redirect(new URL("/auth/login", request.url));
	}

	const response = await fetch("https://proj_ta-1-p8898073.deta.app/auth", {
		headers: { Authorization: `Bearer ${token?.id}` },
	});

	const res = await response.json();

	if (res) {
		const { success, code, data } = res;
		const firstPath = `/${pathname.split("/")[1]}`;

		if (success && code === 200) {
			const isAuthorize = Routes.some((route) =>
				route.role.some(
					(role) => data.role === role && firstPath === route.url,
				),
			);
		}
	}
};

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets).*)"],
};
