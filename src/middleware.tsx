import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Routes } from "./constant/routes";

export async function middleware(req: NextRequest) {
	const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
	const { pathname } = req.nextUrl;
	console.log(token);
	console.log(pathname);

	if (token && (pathname === "/auth/login" || pathname === "/auth/register")) {
		return NextResponse.redirect(new URL("/dashboard", req.url));
	}

	const route = Routes.find((route) => pathname.startsWith(route.url));
	console.log(route);

	if (route) {
		if (!token) {
			return NextResponse.redirect(new URL("/auth/login", req.url));
		}

		const userHasAccess = route.role.includes(token.role);
		console.log(userHasAccess);

		// if (!userHasAccess) {
		// 	return NextResponse.redirect(new URL("/404", req.url));
		// }
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets).*)"],
};
