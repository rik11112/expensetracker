import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWarning } from "@fortawesome/free-solid-svg-icons";

interface FieldErrorMessageProps {
    children: React.ReactNode
}

export default function Warning({ children }: FieldErrorMessageProps) {
    return (
        <span className="text-red text-sm"><FontAwesomeIcon icon={faWarning} /> {children}</span>
    )
}