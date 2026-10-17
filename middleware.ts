import { normalizeHostname, requestedExperience } from "@/lib/experience";
import { publicRoute } from "@/lib/public-routes";
import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const hostname = normalizeHostname(request.headers.get("x-forwarded-host") || request.headers.get("host"));
  const route = publicRoute(pathname, searchParams.get("room"), requestedExperience(hostname, searchParams.get("experience")));
  const destination = request.nextUrl.clone();
  destination.pathname = route.pathname;
  if (route.redirect) {
    destination.searchParams.delete("room");
    return NextResponse.redirect(destination, 308);
  }
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-parablepath-experience", route.experience);
  if (route.pathname !== pathname) return NextResponse.rewrite(destination, { request: { headers: requestHeaders } });
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/", "/assessment", "/results/:path*", "/fun/:path*", "/experiences/popular/:path*", "/experiences/formation/:path*"]
};
