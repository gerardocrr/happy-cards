"use client";

import { useState } from "react";
import { Form } from "@/components/Form";
import { CardSanta } from "@/components/CardSanta";

export default function SantaGifts() {
  const [name, setName] = useState("");
  const [gift, setGift] = useState("");
  return (
    <>
      <Form setName={setName} setGift={setGift} />
      <CardSanta name={name} gift={gift} />
    </>
  );
}
