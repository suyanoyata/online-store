"use client";

import useStore, { AuthState } from "@/context/store";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { setAccountType, setAuthState, setCredentials } = useStore();

  const router = useRouter();

  useEffect(() => {
    setAccountType(null);
    setCredentials(null);
    setAuthState(AuthState.UNAUTHENTICATED);

    document.cookie = `access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

    router.push("/");
  }, [setAccountType, setCredentials, setAuthState, router]);

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Loader2 className="animate-spin" />
    </div>
  );
}
