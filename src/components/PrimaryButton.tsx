interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    id?: string;
}

export default function PrimaryButton({ children, className, onClick, id, ...props }: ButtonProps) {
        return (
            <button id={id}
                className={`${className} group rounded-2xl h-12 w-48 bg-green font-bold text-lg text-white relative overflow-hidden `}
                onClick={onClick} {...props}>
                {children}
                <div
                    className="absolute duration-300 inset-0 w-full h-full transition-all scale-0 group-hover:scale-100 group-hover:bg-white/30 rounded-2xl">
                </div>
            </button>
        )
}
