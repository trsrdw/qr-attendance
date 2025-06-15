import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export const config = {
    matcher: ["/dashboard", "/dashboard/:path*"],
};

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    const { pathname } = req.nextUrl;

    if (!token) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    if (pathname === "/dashboard") {
        return NextResponse.redirect(new URL("/dashboard/home", req.url));
    }

    return NextResponse.next();
}
