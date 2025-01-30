import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "./middleware/auth-middleware";



export function middleware(req: NextRequest) {  
  // authMiddleware
  const response = authMiddleware(req);
  if (response) {
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*",
    // Exclude routes that don't need auth checks
    "/((?!api|_next/static|_next/image|favicon.ico).*)"
  ],
};
