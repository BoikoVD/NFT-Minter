export default function PageContainer({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="max-w-[1425px] px-5 md:px-8 flex flex-col mx-auto min-h-screen relative">
            {children}
        </div>
    );
}