import { NextMiddleware, NextResponse } from "next/server";

export const middleware: NextMiddleware = async (request) => {
	const pathname = request.nextUrl.pathname;

	switch (pathname) {
		case "/auth":
		case "/":
			return NextResponse.redirect(new URL("/auth/login", request.url));
	}
};
