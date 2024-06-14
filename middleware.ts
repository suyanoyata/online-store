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
  const start = performance.now();
  LOG(LOG_LEVEL.VERBOSE, "Start of account sentry");
  const account = await account_sentry(request);
  LOG(
    LOG_LEVEL.VERBOSE,
    `Sentry finished in ${(performance.now() - start).toFixed()}ms`,
  );
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

  LOG(LOG_LEVEL.VERBOSE, "Got request headers");

  if (account != null) {
    LOG(LOG_LEVEL.VERBOSE, "Sentry is not null, getting request cookies");
    if (request?.cookies?.get("access-token")?.value != undefined) {
      LOG(
        LOG_LEVEL.VERBOSE,
        "Request cookies has a value, moving it to headers",
      );

      requestHeaders.set(
        "access-token",
        // @ts-ignore
        request.cookies.get("access-token")?.value,
      );
    }
    LOG(LOG_LEVEL.VERBOSE, "Setting account credentials into headers");
    requestHeaders.set("x-account", JSON.stringify(account));
  }

  LOG(
    LOG_LEVEL.VERBOSE,
    `Redirecting, took ${(performance.now() - start).toFixed()}ms`,
  );

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
