import { NUM_COL, NUM_ROW, NUM_MINE } from "../config";
import useGameService from "../hooks/useGameService";
import Board from "./Board";
import StartOverButton from "./StartOverButton";
import StateDisplay from "./StateDisplay";

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
