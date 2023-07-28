import { useEffect, useState } from "react";
import useCreatePayment, { CreatePaymentModel } from "./useCreatePayment";
import ErrorModal from "@src/components/ErrorModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "@src/components/Modal";
import { useForm } from "react-hook-form";
import PrimaryButton from "@src/components/PrimaryButton";
import getErrorMessage from "@src/util/getErrorMessage";
import Warning from "@components/Warning";
import useGetCategories from "../categories/useGetCategories";

export default function useCreatePaymentButton() {
    const {
        createPayment,
        isCreatePaymentError,
        isCreatePaymentLoading,
    } = useCreatePayment()
    const [showCreateModal, setShowCreateModal] = useState(false);

    const {
        categories,
    } = useGetCategories();

    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (isCreatePaymentError) {
            setErrorMessage("Something went wrong. Please try again.")
        }
    }, [isCreatePaymentError])

    const errorComponent = <ErrorModal error={errorMessage} dismissError={() => setErrorMessage("")} queryKey={['payments']} />

    const createButton = (
        <button id="create-payment-modal-button"
            className={`flex outline-none focus:outline-none group rounded-md bg-green px-3 font-bold text-lg mt-2 text-white items-center relative overflow-hidden`}
            onClick={() => setShowCreateModal(true)}>
            <span className="pr-1 font-semibold flex-1">
                New Payment <FontAwesomeIcon icon={faPlus} />
            </span>
        </button>
    )

    const { register, handleSubmit, watch, formState: { errors }, reset, setFocus } = useForm<CreatePaymentModel>();

    const onSubmit = async (data: CreatePaymentModel) => {
        createPayment(data);
        setShowCreateModal(false)
        reset();
    }

    const noteValidation = { required: false, maxLength: 250, minLength: 0 };

    const createPaymentFormModal = (
        <Modal title="Create Payment" showModal={showCreateModal} setShowModal={setShowCreateModal}>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" id="create-payment-form">
                <div className="mb-3">
                    <h3 className="mb-2 text-dark-blue">Amount</h3>
                    <input
                        {...register("amount")}
                        className="rounded-md w-full outline focus:outline-blue  p-2 text-dark-blue"
                        placeholder="Amount"
                        type="number" />
                    {errors.amount && <Warning>{getErrorMessage(errors.amount.type)}</Warning>}
                </div>

                <select {...register("categoryId")}>
                    {categories.map((category) => (
                        <option key={category.categoryId} value={category.categoryId}>{category.name}</option>
                    ))}
                </select>

                <div className="mb-3">
                    <h3 className="mb-2 text-dark-blue">Note</h3>
                    <input
                        {...register("note", noteValidation)}
                        className="rounded-md w-full outline focus:outline-blue  p-2 text-dark-blue"
                        placeholder="Payment Name"
                        type="text" />
                    {errors.note && <Warning>{getErrorMessage(errors.note.type, noteValidation)}</Warning>}
                </div>

                <div className="w-full text-center">
                    <PrimaryButton className="my-5 text-xl font-semibold px-6 py-3 ">Create</PrimaryButton>
                </div>
            </form>
        </Modal>
    )

    return {
        createButton,
        createPaymentFormModal,
        errorComponent,
    }
}