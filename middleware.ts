import { LOG, LOG_LEVEL } from "another-colored-logger";
import { api } from "@/lib/axios.config";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { experiments } from "./constants/constants";

async function account_sentry(request: NextRequest) {
  const currentUser = request.cookies.get("access-token")?.value;

  if (experiments.DISABLE_SENTRY.CONTROL_VALUE == 1) {
    return null;
  }

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
  const account = await account_sentry(request);
  if (request.nextUrl.pathname.startsWith("/dashboard/products/create")) {
    if (account.type == "customer" || account.type == null) {
      return Response.redirect(new URL("/", request.url));
    }
  }

  const requestHeaders = new Headers(request.headers);

  if (account != null) {
    requestHeaders.set("x-account", JSON.stringify(account));
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
