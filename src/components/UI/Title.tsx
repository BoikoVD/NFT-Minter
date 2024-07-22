interface ITitle {
    children: React.ReactNode,
    tag?: 'h1' | 'h2' | 'h3',
    className?: string,
};

export default function Title({ children, tag = 'h2', className = '' }: ITitle) {
    if (tag === 'h1') {
        return <h1 className={
            `text-3xl text-white font-spaceGrotesk font-bold
            md:text-5xl lg:text-6xl lg:leading-normal lg:tracking-wider
            ${className}`
        }>{children}</h1>
    };
    if (tag === 'h2') {
        return <h2 className={`text-5xl text-white font-spaceGrotesk font-bold ${className}`}>{children}</h2>
    };
    return <h3 className={`text-lg text-white font-spaceGrotesk font-bold ${className}`}>{children}</h3>;
};