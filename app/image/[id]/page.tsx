//import Head from "next/head";

type Params = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Params) {
  const id = (await params).id;

  return {
    title: "title",
    description: "descripcion",
    openGraph: {
      title: "nombre",
      description: "producto",
      images: [
        `https://res.cloudinary.com/dwu9pzsv6/image/upload/f_auto,q_auto/${id}.webp`,
      ],
    },
  };
}

export default async function Image({ params }: Params) {
  const id = (await params).id;

  return (
    <>
      {/* <Head>
        <meta property="og:title" content="nombre" />
        <meta property="og:description" content="producto" />
        <meta
          property="og:image"
          content={`https://res.cloudinary.com/dwu9pzsv6/image/upload/f_auto,q_auto/${id}.webp`}
        />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="800" />
        <meta property="og:image:type" content="image/webp" />
      </Head> */}
      <div className="flex flex-col h-svh items-center justify-center">
        <h1>Imagenes</h1>
        <img
          src={`https://res.cloudinary.com/dwu9pzsv6/image/upload/f_auto,q_auto/${id}.webp`}
          alt="imagen santa claus"
          width={"25%"}
        />
      </div>
    </>
  );
}
