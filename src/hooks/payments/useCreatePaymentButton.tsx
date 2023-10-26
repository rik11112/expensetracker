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
    const [isReceiving, setIsReceiving] = useState(false);
    const switchText = isReceiving ? 'Received' : 'Spent';
    const switchTextColor = isReceiving ? 'text-green-500' : 'text-red-500';

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
            className={`flex outline-none focus:outline-none group rounded-md bg-green px-3 font-bold text-lg text-white items-center relative overflow-hidden`}
            onClick={() => setShowCreateModal(true)}>
            <span className="pr-1 font-semibold flex-1">
                New Payment <FontAwesomeIcon icon={faPlus} />
            </span>
        </button>
    )

    const { register, handleSubmit, watch, formState: { errors }, reset, setFocus } = useForm<CreatePaymentModel>();

    const onSubmit = async (data: CreatePaymentModel) => {
        data.amount = data.amount * 100;    // convert to cents
        if (!isReceiving) {
            data.amount = -data.amount;
        }
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
                        type="number"
                        step={0.01} />
                    {errors.amount && <Warning>{getErrorMessage(errors.amount.type)}</Warning>}
                </div>

                <div className="my-3">
                    <label className={`switch`}>
                        <input type="checkbox" onChange={e => setIsReceiving(e.target.checked)} />
                        <span className="slider round"></span>
                    </label>
                    <span className={`ml-3 font-semibold ${switchTextColor}`}>{switchText}</span>
                </div>

                <select {...register("categoryId")}
                    className="mr-3 rounded-lg">
                    {categories.map((category) => (
                        <option key={category.categoryId} value={category.categoryId}>{category.name}</option>
                    ))}
                </select>
                <label htmlFor="categoryId">Category</label>

                <div className="my-3">
                    <input
                        {...register("date")}
                        className="rounded-md outline focus:outline-blue mr-3 p-2 text-dark-blue"
                        placeholder="Date"
                        type="date" />
                        <label htmlFor="categoryId">Date (optional)</label>
                </div>

                <div className="mb-3">
                    <h3 className="mb-2 text-dark-blue">Note</h3>
                    <input
                        {...register("note", noteValidation)}
                        className="rounded-md w-full outline focus:outline-blue  p-2 text-dark-blue"
                        placeholder="More info"
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