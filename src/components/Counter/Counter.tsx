import { useEffect, useState } from "react";
import styles from "./Counter.module.css";
import { CounterSettings } from "./CounterSettings/CounterSettings";
import { CounterBoard } from "./CounterBoard/CounterBoard";

export type counterProps = {
  min: number;
  max: number;
  settedMin: number;
  settedMax: number;
  currentCount: number;
  isValueChanged: boolean;
  isConfigured: boolean;
  message: string;
};

export const Counter = () => {
  const initialCounter: counterProps = JSON.parse(localStorage.getItem("counter") || "{}");

  const [counter, setCounter] = useState<counterProps>(
    initialCounter.min
      ? initialCounter
      : {
        min: 0,
        max: 5,
        settedMin: 0,
        settedMax: 5,
        currentCount: 0,
        isValueChanged: false,
        isConfigured: false,
        message: "set values",
      }
  );

  useEffect(() => {
    localStorage.setItem("counter", JSON.stringify(counter));
  }, [counter]);

  const setCounterParamiters = (newCounter: counterProps) => {
    if (newCounter.min !== newCounter.settedMin || newCounter.max !== newCounter.settedMax) {
      if (newCounter.min > newCounter.max) {
        newCounter.message = "min > max";
      }
      if (newCounter.min < 0) {
        newCounter.message = "min < 0";
      }
      if (newCounter.min === newCounter.max) {
        newCounter.message = "min === max";
      }
    } else {
      newCounter.isValueChanged = false;
      newCounter.message = "set values";
    }

    setCounter(newCounter);
  };

  const increaseConter = () => {
    setCounter({ ...counter, currentCount: counter.currentCount + 1 });
    // setCounter(prev => {
    //   return {
    //     ...prev,
    //     currentCount: prev.currentCount + 1
    //   }
    // });
  };

  const resetCounter = () => {
    setCounter({ ...counter, currentCount: counter.min });
  };

  return (
    <div className={styles.counter}>
      <CounterSettings counter={counter} setCounterParamiters={setCounterParamiters} />
      <CounterBoard counter={counter} increaseConter={increaseConter} resetCounter={resetCounter} />
    </div>
  );
};
