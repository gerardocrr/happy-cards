import CanvasTextOverlay from "./components/Canvas1";

function App() {
  return (
    <>
      <div className="container max-w-4xl mx-auto bg-red-600 flex flex-col h-svh justify-center items-center">
        <h1>Happy cards</h1>

        <CanvasTextOverlay />
      </div>
    </>
  );
}

export default App;
