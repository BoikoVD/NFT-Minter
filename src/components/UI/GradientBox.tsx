'use client';
import { ReactNode, useEffect, useRef, useState } from "react";

interface IGradientBox {
    children: ReactNode,
    className?: string,
}

export default function GradientBox(props: IGradientBox) {
    const {
        children,
        className
    } = props;
    
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
    
    return (<>
        <div 
            className={`relative p-[1.5px]`}
            ref={ref}
        >
            <div className={`rounded-[10px] relative z-[1] ${className}`}>
                {children}
            </div>
            <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0 z-[0]">
                <rect x="1" y="1" width={width >= 2 ? width - 2 : width} height={height >= 2 ? height - 2 : height} rx="10" stroke="url(#paint0_linear_17_755)" strokeWidth="2"/>
                <defs>
                    <linearGradient id="paint0_linear_17_755" x1={(width / 2).toFixed(0)} y1="0" x2={(width / 2).toFixed(0)} y2={height} gradientUnits="userSpaceOnUse">
                        <stop stopColor="#5500FF"/>
                        <stop offset="1" stopColor="#FF00BF"/>
                    </linearGradient>
                </defs>
            </svg>
        </div>
    </>);
  }