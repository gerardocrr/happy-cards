import { useState } from "react";
import { randomGift } from "@/lib/gifts";

interface FormProps {
  setName: (name: string) => void;
  setGift: (gift: string) => void;
}

export function Form({ setName, setGift }: FormProps) {
  const [namePreview, setNamePreview] = useState("");
  const [optionRadio, setOptionRadio] = useState("random");
  const [customGift, setCustomGift] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (optionRadio === "random") {
      setName(namePreview);
      setGift(randomGift());
    } else {
      setName(namePreview);
      setGift(customGift);
    }
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptionRadio(e.target.value);
  };

  return (
    <>
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
        {optionRadio === "random" ? (
          <button className="bg-white rounded-md mb-5 p-1">
            Buscar regalo 🎅
          </button>
        ) : (
          <div className="flex flex-col">
            <label htmlFor="gift" className="text-lg text-white mb-2">
              Escribe tu regalo:
            </label>
            <input
              id="gift"
              className="mb-5 rounded-md p-1"
              type="text"
              required
              maxLength={55}
              onChange={(e) => setCustomGift(e.target.value)}
            />
            <button className="bg-white rounded-md mb-5 p-1">
              Agregar regalo 🎅
            </button>
          </div>
        )}
      </form>
      <div className="mb-5 w-1/2 flex justify-between">
        <label className="text-white -mx-2">
          <input
            className="mx-2"
            type="radio"
            value="random"
            checked={optionRadio === "random"}
            onChange={handleOptionChange}
          />
          Regalo aleatorio
        </label>
        <label className="text-white">
          <input
            className="mx-2"
            type="radio"
            value="custom"
            checked={optionRadio === "custom"}
            onChange={handleOptionChange}
          />
          Regalo personalizado
        </label>
      </div>
    </>
  );
}
