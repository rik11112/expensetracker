export default function ListItem({ children, className, ...props }: { children: React.ReactNode | React.ReactNode[], className?: string, props?: any}) {
    return (
        <div className={`bar-shadow bg-white rounded-md text-3xl my-3 p-3 flex items-center ${className}`} {...props}>
            {children}
        </div>
    )
}