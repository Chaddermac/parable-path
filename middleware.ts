import { normalizeHostname, requestedExperience } from "@/lib/experience";
import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const forwardedHost = request.headers.get("x-forwarded-host") || request.headers.get("host");
  const hostname = normalizeHostname(forwardedHost);
  const experience = requestedExperience(hostname, searchParams.get("experience"));
  const destination = request.nextUrl.clone();

  if (pathname === "/assessment") {
    destination.pathname = `/experiences/${experience}/assessment`;
    return NextResponse.rewrite(destination);
  }

  if (pathname === "/results" || pathname.startsWith("/results/")) {
    const suffix = pathname.slice("/results".length);
    destination.pathname = `/experiences/${experience}/results${suffix}`;
    return NextResponse.rewrite(destination);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/assessment", "/results", "/results/:path*"]
};
