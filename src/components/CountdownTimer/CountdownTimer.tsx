'use client';
import React, { useState, useEffect } from 'react';
import GradientBox from '../UI/GradientBox';

const CountdownTimer = () => {
  const initialTime = 60 * 60 * 12.23;
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining((prevTime) => {
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
    <div className='flex gap-2 text-white'>
        <GradientBox className='p-2 w-[60px] flex items-center justify-center'>
            {`${hours}h`}
        </GradientBox>
        <GradientBox className='p-2 w-[60px] flex items-center justify-center'>
            {`${minutes}m`}
        </GradientBox>
        <GradientBox className='p-2 w-[60px] flex items-center justify-center'>
            {`${seconds}s`}
        </GradientBox>
    </div>
  );
};

export default CountdownTimer;