"use client";
import { useEffect, useId, useState } from "react";

interface IInputErrorMessage {
  error?: string;
}

export default function InputErrorMessage({ error }: IInputErrorMessage) {
  const [height, setHeight] = useState<number>(0);
  const errorTextId = useId();

  useEffect(() => {
    if (error) {
      const el = document.getElementById(errorTextId);
      if (el) {
        setHeight(el.offsetHeight);
      }
    } else {
      setHeight(0);
    }
  }, [error, errorTextId]);

  return (
    <div
      className="mt-2 overflow-hidden transition-all duration-300"
      style={{ height }}
    >
      <p id={errorTextId} className="text-base text-red">
        {error}
      </p>
    </div>
  );
}
