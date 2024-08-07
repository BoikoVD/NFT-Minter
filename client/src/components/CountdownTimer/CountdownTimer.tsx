"use client";
import React, { useState, useEffect } from "react";
import GradientBox from "@/components/UI/GradientBox";

const styles = {
  wrapper: "flex gap-2 text-white",
  countItem: "flex w-[60px] items-center justify-center p-2"
};

const CountdownTimer = () => {
  const initialTime = 60 * 60 * 12.23;
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining(prevTime => {
        if (prevTime === 0) {
          clearInterval(timerInterval);
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className={styles.wrapper}>
      <GradientBox className={styles.countItem}>{`${hours}h`}</GradientBox>
      <GradientBox className={styles.countItem}>{`${minutes}m`}</GradientBox>
      <GradientBox className={styles.countItem}>{`${seconds}s`}</GradientBox>
    </div>
  );
};

export default CountdownTimer;
