export default function PageContainer({ children, className }: Readonly<{ children: React.ReactNode, className?: string }>) {
    return (
        <div className={`max-w-[1425px] px-5 md:px-8 flex flex-col mx-auto relative ${className}`}>
            {children}
        </div>
    );
}