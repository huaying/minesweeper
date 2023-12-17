import { CellEvent, CellState } from "../constants";
import { NUM_COL, NUM_ROW, NUM_MINE, MINE } from "../config";
import useGameService from "../hooks/useGameService";

export default function Game() {
  const { board, dispatchEvent } = useGameService(NUM_ROW, NUM_COL, NUM_MINE);

  return (
    <div>
      {board.map((row, i) => (
        <div key={i} className="flex">
          {row.map((_, j) => {
            return (
              <div
                key={j}
                className="w-5 h-5 border border-gray-400"
                onClick={() => dispatchEvent(CellEvent.CLICK, i, j)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  dispatchEvent(CellEvent.RIGHT_CLICK, i, j);
                }}
                onDoubleClick={() => dispatchEvent(CellEvent.DB_CLICK, i, j)}
              >
                {board[i][j].state === CellState.ON &&
                  (board[i][j].value === MINE ? "💣" : `${board[i][j].value}`)}
                {board[i][j].state === CellState.FLAG && "🚩"}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
