import Head from "next/head";
import { CreateForm } from "./components/CreateForm.form";

export default function Page() {
  return (
    <>
      <Head>
        <title>Створити товар - sora</title>
      </Head>
      <main className="max-w-[900px] mx-auto px-3">
        <h1 className="text-2xl font-bold mt-2">Створити товар</h1>
        <p className="text-zinc-700 text-sm font-medium mt-2">
          Тут ви можете додати новий продукт до каталогу. Будь ласка, заповніть
          всі необхідні поля нижче, щоб ми могли додати ваш товар. Після
          заповнення форми натисніть кнопку &quot;Створити&quot;.
        </p>
        <CreateForm />
      </main>
    </>
  );
}
