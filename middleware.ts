import { normalizeHostname, requestedExperience } from "@/lib/experience";
import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const forwardedHost = request.headers.get("x-forwarded-host") || request.headers.get("host");
  const hostname = normalizeHostname(forwardedHost);
  const experience = requestedExperience(hostname, searchParams.get("experience"));
  const destination = request.nextUrl.clone();
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-parablepath-experience", experience);

  if (pathname === "/" && experience === "popular") {
    destination.pathname = "/experiences/popular";
    return NextResponse.rewrite(destination, { request: { headers: requestHeaders } });
  }

  if (pathname === "/assessment") {
    destination.pathname = `/experiences/${experience}/assessment`;
    return NextResponse.rewrite(destination, { request: { headers: requestHeaders } });
  }

  if (pathname === "/results" || pathname.startsWith("/results/")) {
    const suffix = pathname.slice("/results".length);
    destination.pathname = `/experiences/${experience}/results${suffix}`;
    return NextResponse.rewrite(destination, { request: { headers: requestHeaders } });
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/", "/assessment", "/results", "/results/:path*"]
};
