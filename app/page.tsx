import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-5">
      <Link
        className="bg-white p-2 rounded-md hover:bg-slate-200"
        href={"/santa-claus"}
      >
        🎅 ¡Santa ya sabe qué te traerá esta Navidad! Descúbrelo ahora. 🎁
      </Link>
      <Link
        className="bg-white p-2 rounded-md hover:bg-slate-200 flex justify-center"
        href={"/new-year"}
      >
        ✨ Descubre qué te espera en el Año Nuevo 🎆
      </Link>
    </div>
  );
}
