import { useState } from "react";
import { CardSanta } from "./components/CardSanta";
import { Form } from "./components/Form";

function App() {
  const [name, setName] = useState("");
  const [gift, setGift] = useState("");
  return (
    <>
      <div className="container max-w-4xl mx-auto bg-red-600 flex flex-col h-svh justify-center items-center">
        <Form setName={setName} setGift={setGift} />
        <CardSanta name={name} gift={gift} />
      </div>
    </>
  );
}

export default App;
