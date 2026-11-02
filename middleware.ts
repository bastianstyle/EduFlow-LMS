import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "eduflow-super-secret-jwt-key-2026-production"
);

const TOKEN_COOKIE_NAME = "eduflow_session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(TOKEN_COOKIE_NAME)?.value;

  let session: { id: string; email: string; role: string; name: string } | null = null;
  if (token) {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      session = payload as any;
    } catch {
      session = null;
    }
  }

  // Auth pages (login, register)
  if (pathname === "/login" || pathname === "/register") {
    if (session) {
      if (session.role === "ADMIN") return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      if (session.role === "INSTRUCTOR") return NextResponse.redirect(new URL("/instructor/dashboard", request.url));
      return NextResponse.redirect(new URL("/student/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // Protected paths
  const isAdminPath = pathname.startsWith("/admin");
  const isInstructorPath = pathname.startsWith("/instructor");
  const isStudentPath = pathname.startsWith("/student");

  if (isAdminPath || isInstructorPath || isStudentPath) {
    if (!session) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (isAdminPath && session.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    if (isInstructorPath && session.role !== "INSTRUCTOR" && session.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/instructor/:path*",
    "/student/:path*",
    "/login",
    "/register",
  ],
};
