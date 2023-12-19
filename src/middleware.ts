import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const isLogin = true;

  if (!isLogin) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
