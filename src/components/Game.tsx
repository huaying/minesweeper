import { GameState } from "../constants";
import { NUM_COL, NUM_ROW, NUM_MINE } from "../config";
import useGameService from "../hooks/useGameService";
import Board from "./Board";
import { memo, useState } from "react";
import clsx from "clsx";

const StateDisplay = memo(({ gameState }: { gameState: GameState }) => {
  if (gameState === GameState.LOST) {
    return "You Lose 😱";
  }
  if (gameState === GameState.WIN) {
    return "You Win 👑";
  }
  return null;
});

const StartOverButton = memo(({ startOver }: { startOver: () => void }) => {
  const [isPressed, setIsPressed] = useState(false);
  return (
    <button
      className={clsx(
        "p-2 bg-gray-200 border-[4px] border-t-gray-100 border-l-gray-100 border-r-gray-500 border-b-gray-500 mb-3",
        {
          "bg-gray-200 border-t-gray-500 border-l-gray-500": isPressed,
        }
      )}
      onMouseDown={() => setIsPressed(true)}
      onMouseOut={() => setIsPressed(false)}
      onMouseUp={() => {
        setIsPressed(false);
        startOver();
      }}
    >
      Start Over
    </button>
  );
});

export default function Game() {
  const { gameState, board, dispatchEvent, startOver } = useGameService(
    NUM_ROW,
    NUM_COL,
    NUM_MINE
  );

  return (
    <>
      <Board board={board} dispatchEvent={dispatchEvent} />
      <StartOverButton startOver={startOver} />
      <StateDisplay gameState={gameState} />
    </>
  );
}
