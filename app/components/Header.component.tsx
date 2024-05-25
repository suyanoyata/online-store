import { Package, Search, ShoppingCart } from "lucide-react";
import HeaderNavigation from "./header/navigation";
import Link from "next/link";
import { HeaderProfile } from "./header/Profile.component";

const HeaderButton = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`w-9 h-9 bg-zinc-100 rounded-full flex items-center justify-center ${className} cursor-pointer`}
    >
      {children}
    </div>
  );
};

export default function Header() {
  return (
    <header className="flex items-center max-w-[900px] mx-auto py-1 px-2">
      <Link href="/">
        <Package />
      </Link>
      <HeaderNavigation />
      <Link
        href="/faq/sellers"
        className="ml-3 text-sm font-medium text-zinc-800"
      >
        Продавцям
      </Link>
      <HeaderProfile />
      <HeaderButton>
        <Search size={20} strokeWidth={2.4} />
      </HeaderButton>
      <HeaderButton className="ml-2">
        <ShoppingCart size={18} strokeWidth={2.4} />
      </HeaderButton>
    </header>
  );
}
