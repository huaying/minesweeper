import bombLogo from "/bomb.svg";

function App() {
  return (
    <div className="flex flex-col items-center mt-10">
      <div className="w-[100px]">
        <img src={bombLogo} />
      </div>
      <h1 className="text-xl">Mine Sweeper</h1>
    </div>
  );
}

export default App;
