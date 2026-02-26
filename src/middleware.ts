import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Routes that require auth
    const protectedPaths = ["/dashboard"];
    const isProtected = protectedPaths.some((p) => pathname.startsWith(p));

    if (!isProtected) return NextResponse.next();

    // Check for auth cookie
    const session = request.cookies.get("autoad-session")?.value;

    if (!session) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"],
};
