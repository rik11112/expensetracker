import {Dispatch, ReactNode, SetStateAction, useEffect, useRef, useState} from "react";
import MenuItemWithDescription from "./MenuItemWithDescription";
import Modal from "@components/Modal";

interface ButtonProps {
    title: React.ReactNode;
    className?: string;
    options: {
        title: string,
        description: string;
        showModal: boolean,
        setShowModal: Dispatch<SetStateAction<boolean>>,
        form: ReactNode,
    }[];
}

export default function ButtonAddDropdown({title, className, options, ...props}: ButtonProps) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownContainerRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        //get ul component and set scale to 10
        setDropdownOpen(!dropdownOpen);
    }

    useEffect(() => {
        // Add event listener to the dropdown container once the component is mounted
        dropdownContainerRef.current!.addEventListener("focusout", (e) => {
            setTimeout(() => {
                // Set the dropdown to closed after 100ms, otherwise the dropdown options won't work
                setDropdownOpen(false);
            }, 100);
        });
    }, []);


    return (
        <div ref={dropdownContainerRef} className={className}>
            <div className="inline-block" {...props} onClick={toggleDropdown}>
                <button id="new-round-dropdown"
                    className={`outline-none focus:outline-none group rounded-md bg-green px-3 font-bold text-lg text-white relative overflow-hidden`}>
                    <span className="pr-1 font-semibold flex-1">{title}</span>
                </button>
                <ul className={`${dropdownOpen ? "scale-100" : "scale-0"} bg-white w-96 text-left border rounded-md transform absolute right-0 transition duration-150 ease-in-out origin-top`}>
                    {options.map((option, index) => {
                        return (
                            <MenuItemWithDescription key={index} title={option.title}
                                                     description={option.description}
                                                     onClick={() => {
                                                         option.setShowModal(true);
                                                     }}/>
                        )
                    })}
                </ul>
            </div>
            {options.map((option, index) => {
                return (
                    <Modal key={index} title={option.title}
                           showModal={option.showModal}
                           setShowModal={option.setShowModal}>
                        {option.form}
                    </Modal>
                )
            })
            }
        </div>
    )


}
