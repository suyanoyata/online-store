import { CreateForm } from "./components/CreateForm.form";

export default function Page() {
  return (
    <>
      <main className="max-w-[900px] mx-auto px-3">
        <h1 className="text-2xl font-bold mt-2">Створити товар</h1>
        <p className="text-zinc-700 text-sm font-medium mt-2">
          Тут ви можете додати новий продукт до каталогу. Будь ласка, заповніть
          всі необхідні поля нижче, щоб ми могли додати ваш товар. Після
          заповнення форми натисніть кнопку &quot;Створити&quot;.
        </p>
        <p className="text-zinc-700 text-sm font-medium mt-2">
          Використовуйте зображення з інтернет магазину{" "}
          <a
            className="text-blue-500 hover:underline"
            target="_blank"
            href="https://rozetka.ua"
          >
            rozetka.ua
          </a>
        </p>
        <CreateForm />
      </main>
    </>
  );
}
