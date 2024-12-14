import { useState } from "react";
import { Layout } from "./components/Layout";
import { Form } from "./components/Form";
import { CardSanta } from "./components/CardSanta";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [gift, setGift] = useState("");
  return (
    <>
      <Layout>
        <div className="container max-w-4xl mx-auto flex flex-col h-svh justify-center items-center">
          <Form setName={setName} setGift={setGift} />
          <CardSanta name={name} gift={gift} />
        </div>
      </Layout>
    </>
  );
}

export default App;
