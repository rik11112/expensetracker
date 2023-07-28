import Modal from "./Modal";
import PrimaryButton from "./PrimaryButton";
import { QueryKey, useQueryClient } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";

interface IErrorModalProps {
    error: string,
    dismissError: () => void,
    queryKey?: QueryKey,
}

/**
 * A modal that is shown when an error occurs with the queryClient
 * @param error The error message, empty string if no error
 * @param dismissError A function that dismisses the error, by setting the error to an empty string
 * @param queryKey The queryKey of the useQuery where the error occured
 */
export default function ({ error, dismissError, queryKey }: IErrorModalProps) {
    const queryClient = useQueryClient();

    const closeErrorModal = () => {
        dismissError();
        queryClient.invalidateQueries(queryKey);
    }

    if (error === "") return null;

    return (
        <Modal title={"Something went wrong"} showModal={true} setShowModal={closeErrorModal}>
            <div className="text-red text-center">
                <FontAwesomeIcon className="text-5xl mb-3" icon={faWarning} />
                <div className="text-xl">{error}</div>
            </div>
            <div className="flex justify-evenly mt-10">
                <PrimaryButton onClick={closeErrorModal}>Reload</PrimaryButton>
            </div>
        </Modal>
    )
}
