import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function authMiddleware(req: NextRequest) {
  const authPaths = ['/auth/login', '/auth/register'];
  const protectedPaths = ['/dashboard'];
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("access_token");
  const isLoggedIn = token?.value ? true : false;

  // If accessing auth paths while logged in
  if (authPaths.includes(pathname) && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // If accessing protected paths while not logged in
  if (protectedPaths.some(path => pathname.startsWith(path)) && !isLoggedIn) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  return NextResponse.next();
}
