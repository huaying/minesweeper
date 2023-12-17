import { useEffect, useState } from "react";
import { GameState } from "../constants";

export default function useTimer(gameState: GameState) {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let intervalTimer: number;

    if (gameState === GameState.ON_GOING) {
      intervalTimer = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
    } else if (gameState === GameState.INIT) {
      setTimer(0);
    }

    return () => {
      intervalTimer && clearInterval(intervalTimer);
    };
  }, [gameState]);

  return timer;
}
