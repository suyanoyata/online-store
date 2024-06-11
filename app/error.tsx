"use client";

import { experiments } from "@/constants/constants";
import NotFoundImage from "@/public/not_found.png";
import AlternativeNotFound from "@/public/alternative_not_found.gif";
import Image from "next/image";

export default function Custom500() {
  return (
    <>
      <main className="max-w-[900px] mx-auto px-3 flex justify-center flex-col mt-5">
        <h1 className="text-2xl font-bold mb-3">Internal Service Error</h1>
        <p className="text-sm text-zinc-700 mb-2 font-medium">
          Вибачте, але сталась помилка на нашому боці.
        </p>
        <p className="text-sm text-zinc-700 font-medium">
          Що ви можете зробити?
        </p>
        <div className="ml-3">
          <p className="text-sm text-zinc-700 font-medium mt-2">
            • Перезавантажити сторінку.
          </p>
          <p className="text-sm text-zinc-700 font-medium mt-2 mb-3">
            • Очистити кеш браузера та спробувати ще раз.
          </p>
        </div>
        {experiments.USE_FUNNY_NOT_FOUND_IMAGE.CONTROL_VALUE === 0 ? null : (
          <Image
            alt=""
            height={150}
            width={150}
            src={AlternativeNotFound}
            className="w-auto h-[150px] object-contain self-start"
          />
        )}
      </main>
    </>
  );
}
