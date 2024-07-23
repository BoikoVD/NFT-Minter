interface IText {
    children: React.ReactNode,
    size?: 'small' | 'large',
    color?: 'white' | 'red', 
    className?: string,
};

const styles = {
    main: 'md:leading-loose md:tracking-wider',
    
    // Sizes
    small: 'text-sm md:text-lg',
    large: 'text-lg md:text-2xl',

    // Colors
    white: 'text-white',
    red: 'text-red-500'
};

export default function Text({ children, className = '', size = 'small', color = 'white' }: IText) {
    
    return <p className={`${styles.main} ${styles[size]} ${styles[color]}`}>{children}</p>;
};