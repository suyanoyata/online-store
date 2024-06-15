"use client";

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
import { Loader2Icon, ShoppingCart, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { account_types_strings } from "@/constants/constants";
import { ICustomer } from "@/types/Customer";

export const HeaderProfileSpecificLinks = () => {
  const { credentials } = useStore();
  return (
    <div className="flex items-center small:hidden">
      {credentials && credentials?.type !== "seller" && (
        <Link
          className="ml-3 text-sm font-medium text-zinc-800 sm:h-6"
          href="/build"
        >
          Збірка
        </Link>
      )}
      {credentials?.type !== "customer" && (
        <Link
          href="/faq/sellers"
          className="ml-3 text-sm font-medium text-zinc-800 sm:h-6"
        >
          Продавцям
        </Link>
      )}
    </div>
  );
};

export const HeaderCartButton = () => {
  const { credentials } = useStore();
  return (
    credentials &&
    credentials?.type !== "seller" && (
      <Link href="/customer/cart">
        <ShoppingCart size={18} strokeWidth={2.4} />
      </Link>
    )
  );
};

export const HeaderProfile = ({ store }: { store: ICustomer | null }) => {
  const {
    auth_state,
    credentials,
    setAuthState,
    setAccountType,
    setCredentials,
    account_type,
  } = useStore();

  useEffect(() => {
    if (store?.id) {
      setAuthState(AuthState.AUTHENTICATED);
    }
    setCredentials(store ? store : null);
    setAccountType(store ? store.type : null);
  }, [store]);

  const SellerDropdown = () => {
    return (
      <DropdownMenuContent>
        <DropdownMenuLabel>{credentials?.name}</DropdownMenuLabel>
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
        <DropdownMenuLabel>{credentials?.name}</DropdownMenuLabel>
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
        <>
          <Link
            href="/customer/account/login"
            className="text-sm font-medium mobile:hidden"
          >
            Увійти в аккаунт
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="focus-visible:outline-none">
              <User className="hidden mobile:flex h-5 mt-1" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => {
                  router.push("/customer/account/login");
                }}
              >
                Увійти в аккаунт
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    }

    return (
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger className="focus-visible:outline-none">
            <p className="text-sm font-medium mobile:hidden select-none">
              {account_types_strings[credentials.type]}
            </p>
            <User className="hidden mobile:flex h-5 mt-1" />
          </DropdownMenuTrigger>
          {account_type === "seller" && <SellerDropdown />}
          {account_type === "customer" && <CustomerDropdown />}
        </DropdownMenu>
      </div>
    );
  };

  return (
    <div className="ml-auto mr-2 text-sm font-medium">
      <ProfileWrapper />
    </div>
  );
};
