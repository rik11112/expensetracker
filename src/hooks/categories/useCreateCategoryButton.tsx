import { useEffect, useState } from "react";
import useCreateCategory, { CreateCategoryModel } from "./useCreateCategory";
import ErrorModal from "@src/components/ErrorModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "@src/components/Modal";
import { useForm } from "react-hook-form";
import PrimaryButton from "@src/components/PrimaryButton";
import getErrorMessage from "@src/util/getErrorMessage";
import Warning from "@components/Warning";
import getRandomHexColor from "@src/util/randomcolor";

export default function useCreateCategoryButton() {
    const {
        createCategory,
        isCreateCategoryError,
        isCreateCategoryLoading,
    } = useCreateCategory()
    const [showCreateModal, setShowCreateModal] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (isCreateCategoryError) {
            setErrorMessage("Something went wrong. Please try again.")
        }
    }, [isCreateCategoryError])

    const errorComponent = <ErrorModal error={errorMessage} dismissError={() => setErrorMessage("")} queryKey={['categories']} />

    const createButton = (
        <button id="create-category-modal-button"
            className={`flex outline-none focus:outline-none group rounded-md bg-green px-3 font-bold text-lg mt-2 text-white items-center relative overflow-hidden`}
            onClick={() => setShowCreateModal(true)}>
            <span className="pr-1 font-semibold flex-1">
                New Category <FontAwesomeIcon icon={faPlus} />
            </span>
        </button>
    )

    const { register, handleSubmit, watch, formState: { errors }, reset, setFocus } = useForm<CreateCategoryModel>();

    const onSubmit = async (data: CreateCategoryModel) => {
        createCategory(data);
        setShowCreateModal(false)
        reset();
    }

    const nameValidation = { required: true, maxLength: 50, minLength: 1 };

    const randomColor = getRandomHexColor();

    const createCategoryFormModal = (
        <Modal title="Create Category" showModal={showCreateModal} setShowModal={setShowCreateModal}>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" id="create-category-form">
                <div className="mb-3">
                    <h3 className="mb-2 text-dark-blue">Name</h3>
                    <input
                        {...register("name", nameValidation)}
                        className="rounded-md w-full outline focus:outline-blue  p-2 text-dark-blue"
                        placeholder="Category Name"
                        type="text" />
                    {errors.name && <Warning>{getErrorMessage(errors.name.type, nameValidation)}</Warning>}
                </div>
                <input
                    {...register("color")}
                    type="color"
                    defaultValue={randomColor}
                    className="" />
                <label htmlFor="color" className="pl-3">Color</label>

                <div className="w-full text-center">
                    <PrimaryButton className="my-5 text-xl font-semibold px-6 py-3 ">Create</PrimaryButton>
                </div>
            </form>
        </Modal>
    )

    return {
        createButton,
        createCategoryFormModal,
        errorComponent,
    }
}