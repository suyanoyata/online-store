"use client";

import { api } from "@/lib/axios.config";
import Link from "next/link";
import { useEffect } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useStore, { AuthState } from "@/context/store";
import { Loader2Icon, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { account_types_strings } from "@/constants/constants";

export const HeaderProfile = () => {
  const {
    auth_state,
    setAuthState,
    setAccountType,
    credentials,
    setCredentials,
    account_type,
  } = useStore();

  useEffect(() => {
    if (auth_state !== AuthState.AUTHENTICATED) {
      setAuthState(AuthState.PENDING);
      if (document.cookie == "") {
        setAuthState(AuthState.UNAUTHENTICATED);
        return;
      }
      api
        .get("/sentry", {
          withCredentials: true,
        })
        .then((response) => {
          setCredentials(response.data.account);
          setAccountType(response.data.account.type);
          setAuthState(AuthState.AUTHENTICATED);
        })
        .catch(() => {
          setAuthState(AuthState.UNAUTHENTICATED);
        });
    }
  }, []);

  const SellerDropdown = () => {
    return (
      <DropdownMenuContent>
        <DropdownMenuLabel>{credentials.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            router.push("/dashboard/products/create");
          }}
        >
          Додати товар
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            router.push("/logout");
          }}
          className="text-red-500 focus:text-red-500"
        >
          Вийти
        </DropdownMenuItem>
      </DropdownMenuContent>
    );
  };

  const CustomerDropdown = () => {
    return (
      <DropdownMenuContent>
        <DropdownMenuLabel>{credentials.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            router.push("/logout");
          }}
          className="text-red-500 focus:text-red-500"
        >
          Вийти
        </DropdownMenuItem>
      </DropdownMenuContent>
    );
  };

  const router = useRouter();

  const ProfileWrapper = () => {
    if (auth_state == AuthState.PENDING) {
      return <Loader2Icon className="animate-spin" />;
    }

    if (!credentials) {
      return (
        <Link href="/customer/account/login" className="text-sm font-medium">
          Увійти в аккаунт
        </Link>
      );
    }

    if (credentials) {
      return (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger className=" focus-visible:outline-none">
              <p className="text-sm font-medium">
                {account_types_strings[credentials.type]}
              </p>
            </DropdownMenuTrigger>
            {account_type === "seller" && <SellerDropdown />}
            {account_type === "customer" && <CustomerDropdown />}
          </DropdownMenu>
        </div>
      );
    }
  };

  return (
    <div className="ml-auto mr-2 text-sm font-medium">
      <ProfileWrapper></ProfileWrapper>
    </div>
  );
};
