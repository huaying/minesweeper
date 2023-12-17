import Game from "./components/Game";

function App() {
  return (
    <div className="flex flex-col items-center mt-10 font-mono">
      <div className="text-4xl mb-3">💣</div>
      <h1 className="text-xl mb-3">Mine Sweeper</h1>
      <Game />
    </div>
  );
}

export default App;
