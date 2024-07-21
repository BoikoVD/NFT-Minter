interface IText {
    children: React.ReactNode,
    className?: string,
};

export default function Text({ children, className = '' }: IText) {
    
    return <p className={`text-lg text-white ${className}`}>{children}</p>;
};