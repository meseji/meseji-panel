import { NextResponse } from "next/server";
import { parse } from "cookie";


export function middleware(req) {

  const cookies = parse(req.headers.get("cookie") || "");
  const userCookie = cookies.user;

  if (!userCookie) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const user = JSON.parse(userCookie);
    if (!user.userId) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  } catch (e) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
