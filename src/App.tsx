import CanvasTextOverlay from "./components/Canvas1";

function App() {
  return (
    <>
      <div className="container max-w-4xl mx-auto bg-red-600 flex flex-col h-svh justify-center items-center">
        <h1>Happy cards</h1>
        <div className="flex flex-col w-1/2">
          <label htmlFor="">Ingresa tu nombre</label>
          <input className="mb-5" type="text" />
          <button className="bg-white rounded-md mb-5">Buscar regalo</button>
        </div>
        <CanvasTextOverlay />
      </div>
    </>
  );
}

export default App;
