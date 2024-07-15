import { MouseEventHandler } from "react";

interface IButton {
    children: React.ReactNode,
    onClick?: MouseEventHandler<HTMLButtonElement>
};

export default function Button({ children, onClick }: IButton) {
    return (<>
        <button 
            onClick={onClick}
            className="text-lg text-white px-24 py-6 transition-all duration-500
            bg-button-gradient bg-size-200 bg-pos-0 hover:bg-pos-100 
            [clip-path:polygon(53px_0%,100%_0%,calc(100%-53px)_100%,0%_100%)]"
        >
            {children}
        </button>
    </>);
}