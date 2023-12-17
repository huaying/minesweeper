import { ComponentProps, memo } from "react";
import { CellState } from "../constants";
import { MINE } from "../config";
import clsx from "clsx";

interface CellProps extends ComponentProps<"div"> {
  state: CellState;
  value: number;
}

const Cell = memo(({ state, value, ...divProps }: CellProps) => {
  return (
    <div
      className={clsx(
        "w-6 h-6 text-sm font-bold flex items-center justify-center cursor-pointer",
        {
          "bg-gray-200 border-[3px] border-t-gray-100 border-l-gray-100 border-r-gray-500 border-b-gray-500":
            state === CellState.OFF || state === CellState.FLAG,
          "bg-gray-200 border border-gray-300": state === CellState.ON,
        }
      )}
      {...divProps}
    >
      {state === CellState.ON &&
        (value === MINE ? "💣" : value > 0 ? `${value}` : "")}
      {state === CellState.FLAG && "🚩"}
    </div>
  );
});

export default Cell;
