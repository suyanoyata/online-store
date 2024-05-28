import { Suspense } from "react";
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
        <h1 className="text-2xl font-bold">Корзина</h1>
        <div className="flex mt-3 gap-10">
          <Suspense fallback={<div>Loading</div>}>
            <ScrollArea className="flex-1 overflow-auto break-words flex flex-col gap-4 max-xl:h-[calc(100vh-275px)]">
              <CartList />
            </ScrollArea>
            <CheckoutDesktop />
          </Suspense>
        </div>
      </main>
      <CheckoutMobile />
    </>
  );
}
