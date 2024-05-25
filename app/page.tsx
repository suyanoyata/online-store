import Header from "./components/Header.component";

export default function Home() {
  return (
    <main>
      <Header />
      {/* {products.map((product, index) => (
        <div key={index}>
          {Object.keys(product).map((key) => (
            <div key={key}>
              <span className="text-zinc-600">{key}</span>{" "}
              <span className="font-bold">{product[key]}</span>
            </div>
          ))}
        </div>
      ))} */}
    </main>
  );
}
