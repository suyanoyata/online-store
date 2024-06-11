import Link from "next/link";
import { CartList } from "./components/CartList.component";
import {
  CheckoutDesktop,
  CheckoutMobile,
} from "./components/Checkout.component";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function Page() {
  return (
    <>
      <main className="max-w-[1000px] mx-auto px-3">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Кошик</h1>
          <Link
            href="/customer/orders"
            className="text-sm text-blue-500 hover:underline"
          >
            Мої замовлення
          </Link>
        </div>
        <div className="flex mt-3 gap-10">
          <ScrollArea className="flex-1 break-words flex flex-col gap-4 max-xl:h-[calc(100vh-275px)] h-[800px]">
            <CartList />
          </ScrollArea>
          <CheckoutDesktop />
        </div>
      </main>
      <CheckoutMobile />
    </>
  );
}
