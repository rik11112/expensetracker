interface SecondaryButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    id?: string;
}
export default function SecondaryButton({ children, className, onClick, id, ...props }: SecondaryButtonProps){
    return (
        <button id={id}
                className={`${className} group rounded-2xl h-12 w-48 bg-white text-green border-green border-2 font-bold text-lg relative overflow-hidden `}
                onClick={onClick} {...props}>
            {children}
            <div
                className="absolute duration-300 inset-0 w-full h-full transition-all scale-0 group-hover:scale-100 group-hover:bg-green-500/30 rounded-2xl">
            </div>
        </button>
    )
}
