import { NUM_COL, NUM_ROW, NUM_MINE } from "../config";
import useGameService from "../hooks/useGameService";
import useTimer from "../hooks/useTimer";
import Board from "./Board";
import StartOverButton from "./StartOverButton";
import StateDisplay from "./StateDisplay";

export default function Game() {
  const { gameState, remainingFlags, board, dispatchEvent, startOver } =
    useGameService(NUM_ROW, NUM_COL, NUM_MINE);

  const timer = useTimer(gameState);

  return (
    <>
      <Board board={board} dispatchEvent={dispatchEvent} />
      <StartOverButton startOver={startOver} />
      <div>Mines: {remainingFlags}</div>
      <div>Timer: {timer}</div>
      <StateDisplay gameState={gameState} />
    </>
  );
}
