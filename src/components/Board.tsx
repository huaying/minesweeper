import Cell from "./Cell";
import { CellEvent } from "../constants";
import useGameService from "../hooks/useGameService";
import { memo } from "react";

interface BoardProps
  extends Pick<ReturnType<typeof useGameService>, "board" | "dispatchEvent"> {}

const Board = memo(({ board, dispatchEvent }: BoardProps) => {
  return (
    <div className="border border-gray-300 shadow-md mb-4">
      {board.map((row, i) => (
        <div key={i} className="flex">
          {row.map((_, j) => {
            return (
              <Cell
                key={`${i},${j}`}
                {...board[i][j]}
                onClick={() => dispatchEvent(CellEvent.CLICK, i, j)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  dispatchEvent(CellEvent.RIGHT_CLICK, i, j);
                }}
                onDoubleClick={() => dispatchEvent(CellEvent.DB_CLICK, i, j)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
});

export default Board;
