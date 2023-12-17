import { memo, useState } from "react";
import clsx from "clsx";

const StartOverButton = memo(({ startOver }: { startOver: () => void }) => {
  const [isPressed, setIsPressed] = useState(false);
  return (
    <button
      className={clsx(
        "p-2 text-sm bg-gray-200 border-[4px] border-t-gray-100 border-l-gray-100 border-r-gray-500 border-b-gray-500 mb-3",
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

export default StartOverButton;
