import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href={"/santa-claus"}>Santa Claus</Link>
      <Link href={"/new-year"}>Año nuevo</Link>
    </div>
  );
}
