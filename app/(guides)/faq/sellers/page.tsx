import { Button } from "@/components/ui/button";
import { experiments } from "@/constants/constants";
import Link from "next/link";
import { NotationAlert } from "../../components/FaqAlert.component";
import Experiment from "@/components/Experiments.component";

export default function Page() {
  const experiment = experiments.ACCEPT_SELLERS_ACCOUNT_EXPERIMENT_BUCKET;

  return (
    <>
      <main className="mx-auto max-w-[900px] px-3">
        <h1 className="text-2xl font-bold mt-2">Розділ для продавців</h1>
        <p className="text-sm font-medium mt-2 text-zinc-800">
          У цьому розділі ви знайдете всю необхідну інформацію, для того щоб
          стати продавцем на нашій платформі.
        </p>
        <h2 className="text-xl font-bold mt-6">Як розпочати?</h2>
        <p className="text-sm font-medium mt-2 text-zinc-800">
          Перш за все потрібно створити аккаунт продавця, або ви можете{" "}
          <Link
            href="/seller/account/login"
            className="text-black underline underline-offset-2 cursor-pointer"
          >
            увійти
          </Link>{" "}
          в нього, якщо він у вас вже є.
        </p>
        <Experiment state={experiment.CONTROL_VALUE == 0}>
          <NotationAlert>{experiment.REASON}</NotationAlert>
        </Experiment>
        <Experiment state={experiment.CONTROL_VALUE == 0}>
          <Button disabled className="mt-2">
            Створити аккаунт
          </Button>
        </Experiment>
        <Experiment state={experiment.CONTROL_VALUE == 1}>
          <Link href={"/seller/account/create"}>
            <Button className="mt-2">Створити аккаунт</Button>
          </Link>
        </Experiment>
        <p className="text-sm font-medium mt-2 text-zinc-800">
          Після цього ви зможете увійти в профіль продавця, та додавати товари.
        </p>
        <h2 className="text-xl font-bold mt-6">
          Додавання товарів, що потрібно знати?
        </h2>
        <p className="text-sm font-medium mt-2 text-zinc-800">
          Ваш товар повинен відповідати високим стандартам якості, мати чіткі
          зображення та опис, в іншому випадку Ваш аккаунт буде відключено.
        </p>
        {/* <p className="text-sm font-medium mt-2 text-zinc-800">
          Зауважте, що використаний або підроблений товар продавати заборонено.
        </p> */}
      </main>
    </>
  );
}
