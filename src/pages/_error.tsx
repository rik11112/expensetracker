import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRobot} from "@fortawesome/free-solid-svg-icons";
import PrimaryButton from "@components/PrimaryButton";
import {useRouter} from "next/navigation";
import { useState } from "react";

export default function Error({message}: { message: string | undefined }) {
    const router = useRouter();
    const [isHovering, setIsHovering] = useState(false);

    return (
        <div className="flex flex-col text-center items-center text-dark-blue mt-8">
            <div>
                {message
                    ? <div>
                        <h1 className="text-4xl text-red">An error occurred on the server</h1>
                        <h2 className="text-2xl text-red">{message}</h2>
                    </div>
                    :
                    <h1 className="text-4xl text-red">An error occured on the client</h1>
                }
            </div>
            <FontAwesomeIcon icon={faRobot} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} bounce={!isHovering} shake={isHovering} className="text-blue fa-10x mt-32"/>
            <PrimaryButton onClick={() => router.refresh()} className="mt-20">Retry</PrimaryButton>
        </div>
    );
}
