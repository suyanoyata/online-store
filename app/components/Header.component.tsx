import { Package, Search, ShoppingCart } from "lucide-react";
import HeaderNavigation from "./header/navigation";
import Link from "next/link";
import { HeaderProfile } from "./header/Profile.component";
import { headers } from "next/headers";
import { experiments } from "@/constants/constants";

export const HeaderButton = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`w-9 h-9
      "bg-zinc-100 rounded-full"
       flex items-center justify-center ${className} cursor-pointer min-w-[36px]`}
    >
      {children}
    </div>
  );
};

export default function Header() {
  const headersList = headers();

  let credentials: ICustomer | null = null;

  if (headersList.get("x-account") != null) {
    credentials = JSON.parse(headersList.get("x-account") as string);
  }

  return (
    <header className="w-full sticky top-0 bg-white z-20 py-1">
      <div className="max-w-[900px] flex items-center mx-auto py-1 px-2 root-header">
        <Link href="/">
          <Package />
        </Link>
        <HeaderNavigation />
        <div className="flex items-center small:hidden">
          {credentials && credentials?.type !== "seller" && (
            <Link
              className="ml-3 text-sm font-medium text-zinc-800 sm:h-6"
              href="/build"
            >
              Збірка
            </Link>
          )}
          <Link
            href="/faq/sellers"
            className="ml-3 text-sm font-medium text-zinc-800 sm:h-6"
          >
            Продавцям
          </Link>
        </div>
        <HeaderProfile store={credentials} />
        {experiments.DISABLE_SEARCH_APPEARANCE.CONTROL_VALUE == 0 && (
          <HeaderButton>
            <Search size={20} strokeWidth={2.4} />
          </HeaderButton>
        )}
        {/* <Cart /> */}
        {credentials && credentials?.type !== "seller" && (
          <Link href="/customer/cart">
            <ShoppingCart size={18} strokeWidth={2.4} />
          </Link>
        )}
      </div>
    </header>
  );
}
