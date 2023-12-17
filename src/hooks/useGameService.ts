import { useCallback, useMemo, useState } from "react";
import { GameService } from "../services/game";
import { CellEvent } from "../constants";

const useGameService = (numRows: number, numCols: number, numMines: number) => {
  const service = useMemo(
    () => new GameService(numRows, numCols, numMines),
    [numRows, numCols, numMines]
  );

  const [board, setBoard] = useState(service.getBoard());

  const dispatchEvent = useCallback(
    (event: CellEvent, x: number, y: number) => {
      service.dispatchEvent(event, x, y);
      setBoard(service.getBoard());
    },
    [service]
  );

  return { board, dispatchEvent };
};

export default useGameService;
