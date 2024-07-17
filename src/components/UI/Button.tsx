"use client"
import { MouseEventHandler, useState } from "react";

interface IButton {
    children: React.ReactNode,
    onClick?: MouseEventHandler<HTMLButtonElement>,
    size?: 'small' | 'medium' | 'large',
    hoverText?: string | null,
    className?: string,
};

const styles = {
    main: 'text-lg text-white transition-all duration-500 bg-button-gradient bg-size-200 bg-pos-0 hover:bg-pos-100 [clip-path:polygon(53px_0%,100%_0%,calc(100%-53px)_100%,0%_100%)]',
  
    // Sizes
    small: 'px-14 py-3',
    medium: 'px-20 py-6',
    large: 'px-24 py-6',
};

export default function Button({ children, onClick, size = 'large', hoverText = null, className }: IButton) {
    const [isMouseOver, setIsMouseOver] = useState<boolean>(false);

    return (<>
        <button 
            onClick={onClick}
            className={`${styles.main} ${styles[size]} ${className}`}
            onMouseOver={hoverText ? () => setIsMouseOver(true) : undefined}
            onMouseOut={hoverText ? () => setIsMouseOver(false) : undefined}
        >
            {isMouseOver ? hoverText : children}
        </button>
    </>);
}