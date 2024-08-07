"use client";
import { ReactNode, useEffect, useRef, useState } from "react";

interface IGradientBox {
  children: ReactNode;
  id?: string;
  className?: string;
  wrapperClassName?: string;
  transparentBorder?: "left" | "right" | undefined;
}

export default function GradientBox(props: IGradientBox) {
  const { children, id, className, wrapperClassName, transparentBorder } =
    props;

  const ref = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (!ref.current) return;

    const resizeObserver = new ResizeObserver(() => {
      if (ref.current?.offsetHeight !== undefined) {
        setHeight(ref.current.offsetHeight);
      }
      if (ref.current?.offsetWidth !== undefined) {
        setWidth(ref.current.offsetWidth);
      }
    });
    resizeObserver.observe(ref.current);

    return () => resizeObserver.disconnect();
  }, [ref.current]);

  return (
    <>
      <div
        className={`relative p-[1.5px] ${wrapperClassName}`}
        id={id}
        ref={ref}
      >
        <div className={`relative z-[1] rounded-[10px] ${className}`}>
          {children}
        </div>
        {!transparentBorder ? (
          <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-0 top-0 z-[0]"
          >
            <rect
              x="1"
              y="1"
              width={width >= 2 ? width - 2 : width}
              height={height >= 2 ? height - 2 : height}
              rx="10"
              stroke="url(#paint0_linear_17_755)"
              strokeWidth="2"
            />
            <defs>
              <linearGradient
                id="paint0_linear_17_755"
                x1={(width / 2).toFixed(0)}
                y1="0"
                x2={(width / 2).toFixed(0)}
                y2={height}
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#5500FF" />
                <stop offset="1" stopColor="#FF00BF" />
              </linearGradient>
            </defs>
          </svg>
        ) : transparentBorder === "left" ? (
          <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-0 top-0 z-[0]"
          >
            <rect
              x="1"
              y="1"
              width={width >= 2 ? width - 2 : width}
              height={height >= 2 ? height - 2 : height}
              rx="10"
              stroke="url(#paint1_linear_17_755)"
              strokeWidth="2"
            />
            <defs>
              <linearGradient
                id="paint1_linear_17_755"
                x1={width / 2}
                y1={(height / 2).toFixed(0)}
                x2={width}
                y2={(height / 2).toFixed(0)}
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="rgba(255,0,191,0)" />
                <stop offset="1" stopColor="#FF00BF" />
              </linearGradient>
            </defs>
          </svg>
        ) : (
          <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-0 top-0 z-[0]"
          >
            <rect
              x="1"
              y="1"
              width={width >= 2 ? width - 2 : width}
              height={height >= 2 ? height - 2 : height}
              rx="10"
              stroke="url(#paint2_linear_17_755)"
              strokeWidth="2"
            />
            <defs>
              <linearGradient
                id="paint2_linear_17_755"
                x1="0"
                y1={(height / 2).toFixed(0)}
                x2={width / 2}
                y2={(height / 2).toFixed(0)}
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FF00BF" />
                <stop offset="1" stopColor="rgba(255,0,191,0)" />
              </linearGradient>
            </defs>
          </svg>
        )}
      </div>
    </>
  );
}
