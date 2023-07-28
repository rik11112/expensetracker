import { ReactNode } from "react";

interface IModalProps {
    title: string;
    children: ReactNode;
    showModal: boolean;
    setShowModal: (showModal: boolean) => void;
}

export default function Modal({
    title,
    children,
    showModal,
    setShowModal
}: IModalProps) {

    if (!showModal) return null;

    return (
        <div id="defaultModal" tabIndex={-1} aria-hidden="true"
            className={`fixed top-0 bg-black bg-opacity-50 left-0 right-0 z-50 w-full h-screen overflow-x-hidden overflow-y-auto md:inset-0`}>
            <div className="relative w-4/5 max-w-2xl max-h-full mx-auto my-auto">
                <div className="h-screen flex justify-center items-center">
                    {/*Modal content*/}
                    <div className="relative bg-white rounded-lg shadow w-full">
                        {/*Modal header*/}
                        <div className="flex items-start justify-between px-6 py-4 border-b-2 rounded-t bg-light-green">
                            <h3 className="text-3xl font-semibold text-blue ">
                                {title}
                            </h3>
                            <button type="button"
                                className="text-gray-400 bg-transparent hover:bg-light-gray hover:text-dark-blue rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                                data-modal-hide="defaultModal" onClick={() => setShowModal(false)}>
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
                                </svg>
                            </button>
                        </div>
                        <div className="p-6 text-xl">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
