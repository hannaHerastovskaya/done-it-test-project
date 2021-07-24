import { useState, useEffect } from 'react';

export const useTimer = (
  isCurrentQuestion: boolean,
  time: number,
  setFullTime: (arg: (fullTime: number) => number) => void,
  finishInterval: () => void
): number => {
  const [seconds, setSeconds] = useState(time);

  useEffect(() => {
    // @ts-ignore
    let interval: NodeJS.Timeout = null;

    if (isCurrentQuestion && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1000);
      }, 1000);

      setFullTime((fullTime: number) => fullTime + 1)
    }

    if (seconds <= 0) {
      clearInterval(interval);
      finishInterval();
    }
    return () => clearInterval(interval);
  }, [isCurrentQuestion, seconds]);

  return seconds;
}
