import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME } from "./utils/constants";

export default function middlware(req: NextRequest, res: NextResponse) {
  if (req.nextUrl.pathname === "/dashboard") {
    if (!req.cookies.has(COOKIE_NAME)) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  }

  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/"],
};
