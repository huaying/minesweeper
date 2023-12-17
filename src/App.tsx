import Game from "./components/Game";
import bombLogo from "/bomb.svg";

function App() {
  return (
    <div className="flex flex-col items-center mt-10">
      <div className="w-[100px]">
        <img src={bombLogo} />
      </div>
      <h1 className="text-xl mb-3">Mine Sweeper</h1>
      <Game />
    </div>
  );
}

export default App;
