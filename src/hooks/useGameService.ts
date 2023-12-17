import { useCallback, useMemo, useState } from "react";
import { GameService } from "../services/game";
import { CellEvent, GameState } from "../constants";

const useGameService = (numRows: number, numCols: number, numMines: number) => {
  const service = useMemo(
    () => new GameService(numRows, numCols, numMines),
    [numRows, numCols, numMines]
  );

  const [board, setBoard] = useState(service.getBoard());
  const [gameState, setGameState] = useState(service.getGameState());

  const dispatchEvent = useCallback(
    (event: CellEvent, x: number, y: number) => {
      if (gameState !== GameState.ON_GOING) {
        return;
      }

      service.dispatchEvent(event, x, y);

      setGameState(service.getGameState());
      setBoard(service.getBoard());
    },
    [service, gameState]
  );

  const startOver = useCallback(() => {
    service.startOver();

    setGameState(service.getGameState());
    setBoard(service.getBoard());
  }, [service]);

  return { gameState, board, dispatchEvent, startOver };
};

export default useGameService;
