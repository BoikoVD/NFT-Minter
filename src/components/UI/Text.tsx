interface IText {
    children: React.ReactNode,
    className?: string,
};

export default function Text({ children, className = '' }: IText) {
    
    return <p className={`text-lg text-white md:text-sm md:leading-loose md:tracking-wider ${className}`}>{children}</p>;
};