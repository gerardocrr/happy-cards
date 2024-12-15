"use client";

import { useState } from "react";
import { CardSanta } from "@/components/CardSanta";

export default function () {
  const [name, setName] = useState("");
  const [gift, setGift] = useState("");
  return (
    <>
      <CardSanta name={name} gift={gift} />
    </>
  );
}
