import Image from "next/image";
import NotFoundImage from "@/public/not_found.png";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <main className="max-w-[900px] mx-auto px-3 flex justify-center flex-col mt-5">
        <h1 className="text-2xl font-bold mb-3">Цієї сторінки не існує</h1>
        <p className="text-sm text-zinc-700 mb-2 font-medium">
          Вибачте, але здається, що ви загубилися. Сторінка, яку ви шукаєте, не
          існує або була переміщена.
        </p>
        <p className="text-sm text-zinc-700 font-medium">
          Що ви можете зробити?
        </p>
        <div className="ml-3">
          <p className="text-sm text-zinc-700 font-medium mt-2">
            • Повернутися на{" "}
            <Link href="/" className="text-blue-500">
              головну сторінку.
            </Link>
          </p>
          <p className="text-sm text-zinc-700 font-medium mt-2 mb-3">
            • Перевірити правильність введеної URL-адреси.
          </p>
        </div>
        <Image
          src={NotFoundImage}
          alt=""
          width={400}
          height={0}
          className="h-auto"
        />
      </main>
    </>
  );
}
