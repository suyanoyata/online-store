import { LOG, LOG_LEVEL } from "another-colored-logger";
import { api } from "@/lib/axios.config";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { experiments } from "./constants/constants";

async function account_sentry(request: NextRequest) {
  const currentUser = request.cookies.get("access-token")?.value;

  if (experiments.DISABLE_SENTRY.CONTROL_VALUE == 1) {
    LOG(LOG_LEVEL.ERROR, experiments.DISABLE_SENTRY.REASON);
    return null;
  }

  if (!currentUser) return null;

  return await api
    .get("/sentry", {
      headers: {
        cookie: `access-token=${currentUser}`,
      },
      withCredentials: true,
    })
    .then((response) => {
      return response.data.account;
    })
    .catch(() => {
      return null;
    });
}

export async function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname.startsWith(
      "/_next/static" || request.nextUrl.pathname.startsWith("/favicon"),
    )
  ) {
    return NextResponse.next();
  }

  const account = await account_sentry(request);
  if (request.nextUrl.pathname.startsWith("/dashboard/products/create")) {
    if (account.type == "customer" || account.type == null) {
      return Response.redirect(new URL("/", request.url));
    }
  }

  if (
    request.nextUrl.pathname.startsWith("/customer/cart") ||
    request.nextUrl.pathname.startsWith("/build")
  ) {
    if (account?.type !== "customer" || account.type == null) {
      return Response.redirect(new URL("/", request.url));
    }
  }

  const requestHeaders = new Headers(request.headers);

  if (account != null) {
    if (request?.cookies?.get("access-token")?.value != undefined) {
      requestHeaders.set(
        "access-token",
        // @ts-ignore
        request.cookies.get("access-token")?.value,
      );
    }
    requestHeaders.set("x-account", JSON.stringify(account));
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
