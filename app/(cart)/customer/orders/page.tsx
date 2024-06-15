import { api } from "@/lib/axios.config";
import { IBaseProduct } from "@/types/Products";
import { headers } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import { CameraOff } from "lucide-react";

type Order = {
  id: string;
  orderDate: Date;
  orderStatus: string;
  orderTotal: number;
  orderUserId: string;
  orderItems: IBaseProduct[];
  prettyOrderId: string;
};

export default async function Page() {
  const headersList = headers();

  const token = headersList.get("access-token");

  const orders: Order[] = await api
    .get("/orders", {
      headers: {
        "access-token": token,
      },
    })
    .then((response) => {
      return response.data;
    });

  return (
    <main className="max-w-[900px] mx-auto px-3">
      <h1 className="text-2xl font-bold text-black mb-3">Мої замовлення</h1>

      {orders.map((order) => (
        <div key={order.id}>
          <div className="flex items-baseline max-sm:flex-col">
            <h1 className="font-bold text-lg mt-2">
              Замовлення {order.prettyOrderId}
            </h1>
            <p className="ml-2 max-sm:ml-0">
              {new Intl.DateTimeFormat("uk-UK", {
                dateStyle: "full",
                timeStyle: "medium",
              }).format(new Date(order.orderDate))}
            </p>
          </div>
          {order.orderItems.map((product) => (
            <Link
              href={`/products/view/${product.id}`}
              key={product.id}
              className="py-2 flex gap-2 items-center"
            >
              {product.product_image && (
                <Image
                  src={product.product_image}
                  width={60}
                  height={60}
                  alt=""
                />
              )}
              {!product.product_image && (
                <div className="w-[60px] h-[60px] bg-zinc-100 rounded-sm flex items-center justify-center flex-shrink-0">
                  <CameraOff className="text-zinc-400" size={20} />
                </div>
              )}
              <p className="font-medium">{product.product_title}</p>
            </Link>
          ))}
          <p className="font-medium text-zinc-500 mb-12">
            Вартість замовлення:{" "}
            <span className="text-black">{order.orderTotal} UAH</span>
          </p>
        </div>
      ))}
    </main>
  );
}
