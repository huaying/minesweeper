import { memo } from "react";
import { GameState } from "../constants";

const StateDisplay = memo(({ gameState }: { gameState: GameState }) => {
  if (gameState === GameState.LOST) {
    return "You Lose 😱";
  }
  if (gameState === GameState.WIN) {
    return "You Win 👑";
  }
  return null;
});

export default StateDisplay;
