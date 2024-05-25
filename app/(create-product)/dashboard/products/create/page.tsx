import Header from "@/app/components/Header.component";

export default function Page() {
  return (
    <>
      <Header />
      <main className="max-w-[900px] mx-auto">
        <h1 className="text-2xl font-bold mt-2">Створити продукт</h1>
        <p className="text-zinc-700 text-sm font-medium mt-2">
          Тут ви можете додати новий продукт до каталогу. Будь ласка, заповніть
          всі необхідні поля нижче, щоб ми могли додати ваш товар. Після
          заповнення форми натисніть кнопку &quot;Створити&quot;.
        </p>
      </main>
    </>
  );
}
