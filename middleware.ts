import { api } from "@/lib/axios.config";
import type { NextRequest } from "next/server";
import { LOG, LOG_LEVEL } from "another-colored-logger";

async function account_sentry(request: NextRequest) {
  const currentUser = request.cookies.get("access-token")?.value;

  return await api
    .get("/sentry", {
      headers: {
        cookie: `access-token=${currentUser}`,
      },
      withCredentials: true,
    })
    .then((response) => {
      console.log(request.headers.get("X-Forwarded-For"));
      return response.data.account.type;
    })
    .catch(() => {
      return null;
    });
}

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/dashboard/products/create")) {
    const type = await account_sentry(request);

    if (type == "customer" || type == null) {
      return Response.redirect(new URL("/", request.url));
    }
  }
}
