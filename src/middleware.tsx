import { getToken } from "next-auth/jwt";
import { NextMiddleware, NextResponse } from "next/server";

export const middleware: NextMiddleware = async (request) => {
	const pathname = request.nextUrl.pathname;

	const token = await getToken({
		req: request,
		secret: process.env.NEXTAUTH_SECRET,
	});

	if (!token && !["/auth/login"].includes(pathname)) {
		return NextResponse.redirect(new URL("/auth/login", request.url));
	}

	const response = await fetch("https://proj_ta-1-p8898073.deta.app/auth", {
		headers: { Authorization: `Bearer ${token?.id}` },
	});

	const data = await response.json();

	if (data.success) {
		switch (pathname) {
			case "/auth":
			case "/login":
			case "/":
				return NextResponse.redirect(new URL("/auth/login", request.url));
		}
	}
};

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets).*)"],
};
