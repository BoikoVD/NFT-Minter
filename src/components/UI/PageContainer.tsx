export default function PageContainer({
  children,
  className
}: Readonly<{ children: React.ReactNode; className?: string }>) {
  return (
    <div
      className={`relative mx-auto flex max-w-[1425px] flex-col px-5 md:px-8 ${className}`}
    >
      {children}
    </div>
  );
}
