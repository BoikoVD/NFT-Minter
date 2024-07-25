interface ITitle {
    children: React.ReactNode,
    tag?: 'h1' | 'h2' | 'h3',
    size?: 'small' | 'medium' | 'large',
    className?: string,
};

const styles = {
    small: 'text-lg text-white font-spaceGrotesk font-bold',
    medium: 'text-3xl text-white font-spaceGrotesk font-bold md:text-5xl',
    large: 'text-3xl text-white font-spaceGrotesk font-bold md:text-4xl lg:text-5xl lg:leading-normal lg:tracking-wide',
};

export default function Title({ children, tag = 'h1', size = 'large', className = '' }: ITitle) {
    if (tag === 'h1') {
        return <h1 className={`${styles[size]} ${className}`}>{children}</h1>
    };
    if (tag === 'h2') {
        return <h2 className={`${styles[size]} ${className}`}>{children}</h2>
    };
    return <h3 className={`${styles[size]} ${className}`}>{children}</h3>;
};