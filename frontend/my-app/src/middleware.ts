import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: { cookies: { get: (arg0: string) => { (): any; new(): any; value: any; }; }; nextUrl: { pathname: any; }; url: string | URL; }) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  if (
    pathname.startsWith("/admin") &&
    !pathname.startsWith("/admin/login")
  ) {
    if (!token) {
      return NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
    }
  }

  return NextResponse.next();
}