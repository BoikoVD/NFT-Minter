import cn from "classnames";

interface ITitle {
    children: React.ReactNode,
    tag?: 'h1' | 'h2' | 'h3',
    className?: string,
};

export default function Title({ children, tag = 'h2', className = '' }: ITitle) {
    if (tag === 'h1') {
        return <h1 className={cn('text-7xl text-white font-spaceGrotesk font-light', className)}>{children}</h1>
    };
    if (tag === 'h2') {
        return <h2 className={cn('text-5xl text-white font-spaceGrotesk font-bold', className)}>{children}</h2>
    };
    return <h3 className={cn('text-lg text-white font-spaceGrotesk font-bold', className)}>{children}</h3>;
};