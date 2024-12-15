import { useState } from "react";
import { randomGift } from "@/lib/gifts";

interface FormProps {
  setName: (name: string) => void;
  setGift: (gift: string) => void;
}

export function Form({ setName, setGift }: FormProps) {
  const [namePreview, setNamePreview] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setName(namePreview);
    setGift(randomGift());
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-1/2">
      <label htmlFor="name" className="text-lg text-white mb-2">
        Ingresa tu nombre:
      </label>
      <input
        id="name"
        className="mb-5 rounded-md p-1"
        type="text"
        required
        maxLength={10}
        onChange={(e) => setNamePreview(e.target.value)}
      />
      <button className="bg-white rounded-md mb-5 p-1">Buscar regalo 🎅</button>
    </form>
  );
}
