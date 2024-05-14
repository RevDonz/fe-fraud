import { getToken } from "next-auth/jwt";
import { NextResponse, type NextMiddleware } from "next/server";
import { Routes } from "./constant/routes";

export const middleware: NextMiddleware = async (request) => {
	const pathname = request.nextUrl.pathname;

	const token = await getToken({
		req: request,
		secret: process.env.NEXTAUTH_SECRET,
	});

	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth`,
			{
				headers: { Authorization: `Bearer ${token?.id}` },
			},
		);

		const res = await response.json();

		if (!token && !["/auth/login", "/auth/register", "/"].includes(pathname)) {
			return NextResponse.redirect(new URL("/auth/login", request.url));
		}

		const firstPath = `/${pathname.split("/")[1]}/${pathname.split("/")[2]}`;

		const { success, code, data } = res;
		if (success && code === 200) {
			const isAuthorize = checkUserPermission(pathname, data.role);

			if (
				!isAuthorize &&
				!["/not-found", "/auth/login", "/root/login", "/"].includes(pathname)
			) {
				return NextResponse.redirect(new URL("/not-found", request.url));
			}

			switch (pathname) {
				case "/":
					return NextResponse.redirect(new URL("/dashboard", request.url));
			}
		}
	} catch (error) {
		console.error("Error during API call:", error);

		return NextResponse.redirect(new URL("/error", request.url));
	}
};

const checkUserPermission = (firstPath: string, userRole: string) => {
	const route = Routes.find((route) => route.url === firstPath);

	if (!route) {
		return false;
	}

	return route.role.includes(userRole);
};

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets).*)"],
};
