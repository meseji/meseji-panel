// import { NextResponse } from "next/server";
// import { parse } from "cookie";
// import createMiddleware from 'next-intl/middleware';
// import { routing } from './i18n/routing';

// const intlMiddleware = createMiddleware(routing);

// export function middleware(req) {

//   const intlResponse = intlMiddleware(req);
//   if (intlResponse) return intlResponse;

//   const cookies = parse(req.headers.get("cookie") || "");
//   const userCookie = cookies.user;

//   if (!userCookie) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   try {
//     const user = JSON.parse(userCookie);
//     if (!user.userId) {
//       return NextResponse.redirect(new URL("/login", req.url));
//     }
//   } catch (e) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/((?!_next|api|static|favicon.ico).*)"],
// };

// import { NextResponse } from "next/server";
// import { parse } from "cookie";
// import createMiddleware from "next-intl/middleware";
// import { routing } from "./i18n/routing";

// const intlMiddleware = createMiddleware(routing);

// export function middleware(req) {
//   const url = new URL(req.url);
//   const { pathname } = url;

//   // Run the internationalization middleware first
//   const intlResponse = intlMiddleware(req);
//   if (intlResponse) return intlResponse;

//   // Allow access to login page without redirection
//   if (pathname.startsWith("/login")) {
//     return NextResponse.next();
//   }

//   // Parse cookies safely
//   const cookies = parse(req.headers.get("cookie") || "");
//   const userCookie = cookies.user;

//   // If no user session, redirect to login
//   if (!userCookie) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   try {
//     const user = JSON.parse(userCookie);
//     if (!user?.userId) {
//       return NextResponse.redirect(new URL("/login", req.url));
//     }
//   } catch (e) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   return NextResponse.next();
// }

// // Ensure correct paths are matched
// export const config = {
//   matcher: [
//     "/dashboard/:path*", // Protects dashboard pages
//     "/((?!_next|api|static|favicon.ico).*)", // Allows other pages to load normally
//   ],
// };

import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ['/((?!blog|dashboard|api|_next|_vercel|.*/opengraph-image|.*\\..*).*)']
};
