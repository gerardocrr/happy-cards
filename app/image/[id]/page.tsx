import Link from "next/link";

type Params = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Params) {
  const id = (await params).id;

  return {
    openGraph: {
      title:
        "🎅 ¡Santa ya sabe qué te traerá esta Navidad! Descúbrelo ahora. 🎁",
      description:
        "¿Fuiste bueno o travieso este año? 🎄 Santa Claus tiene un mensaje especial para ti. Genera tu imagen personalizada y compártela con tus amigos. ¡Descubre qué sorpresa te espera bajo el árbol!",
      images: [`https://happy-cards.vercel.app/image/${id}`],
    },
  };
}

export default async function Image({ params }: Params) {
  const id = (await params).id;

  return (
    <>
      <img
        className="rounded-md mb-5"
        src={`https://res.cloudinary.com/dwu9pzsv6/image/upload/f_auto,q_auto/${id}.webp`}
        alt="santa claus gift"
        width={"50%"}
      />
      <Link
        href={"/santa-claus"}
        className="bg-white w-1/2 rounded-md p-1 flex justify-center"
      >
        Crea tu propia imagen 🎅
      </Link>
    </>
  );
}
