import cn from "classnames";

interface IText {
    children: React.ReactNode,
    className?: string,
};

export default function Text({ children, className = '' }: IText) {
    
    return <p className={cn('text-lg text-white', className)}>{children}</p>;
};