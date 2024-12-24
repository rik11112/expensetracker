import { faCircleXmark, faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useDeletePayment from "@src/hooks/payments/useDeletePayment";
import useGetPayments from "@src/hooks/payments/useGetPayments"
import { LegacyRef, useEffect, useRef, useState } from "react";
import Modal from "@src/components/Modal";


export default function displayPayments() {
    const {
        payments,
        error,
        isError,
        isFetching,
        fetchStatus,
        months: monthsState,
        changeMonths,
    } = useGetPayments();
    const months = useRef<HTMLSelectElement>(null);

    const {
        deletePayment,
    } = useDeletePayment();

    const selectMonths = (
        <select ref={months} value={monthsState} className="border border-gray-300 rounded-md p-1" onChange={e => changeMonths(parseInt(e.target.value))}>
            <option value="1">1 month</option>
            <option value="2">2 months</option>
            <option value="3">3 months</option>
            <option value="6">6 months</option>
            <option value="12">1 year</option>
            <option value="0">all</option>
        </select>
    )

    const [deleteModalPaymentId, setDeleteModalPaymentId] = useState(0) // 0 means modal inactive
    const closeDeleteModal = () => setDeleteModalPaymentId(0)
    const confirmDelete = () => {
        deletePayment(deleteModalPaymentId)
        closeDeleteModal()
    }
    const deleteModal = (
        <Modal title={"Delete Payment"} showModal={deleteModalPaymentId != 0} setShowModal={closeDeleteModal}>
            <div className="flex flex-col items-center justify-center">
                Are you sure you want to delete this payment?
                <div className="flex justify-center items-center mt-5">
                    <button className="bg-green-500 text-white rounded-md p-1 mx-3" onClick={confirmDelete}>Confirm</button>
                    <button className="bg-red-500 text-white rounded-md p-1 mx-3" onClick={closeDeleteModal}>Cancel</button>
                </div>
            </div>
        </Modal>
    )

    const paymentList = payments?.map((payment) => {
        const isPositive = payment.amount >= 0;
        const sign = isPositive ? "+" : ""
        const color = isPositive ? "text-green-500" : "text-red-500"
        const deleteButton = (
            <div className="absolute -top-1 -right-2 w-6 h-6 bg-white rounded-full">
                <FontAwesomeIcon 
                icon={faCircleXmark}
                 className="text-red-500 relative -top-2 right-1 hover:text-red-700 cursor-pointer"
                 onClick={() => setDeleteModalPaymentId(payment.paymentId)} />
            </div>
        )
        return (
            <div
                style={{ backgroundColor: payment.category.color }}
                key={payment.paymentId}
                className={`bar-shadow rounded-md text-3xl my-3 p-3 text-center text-white relative`}>
                <div className="flex items-center justify-between">
                    <span className={`${color} multi-shadow-text`}>{sign}{payment.amount / 100}</span>
                    <span >{payment.date}</span>
                </div>
                {payment.note && <span className="text-lg">{payment.note}</span>}
                {deleteButton}
            </div>
        )
    })

    const downloadButton = (
        <a
            className="flex outline-none focus:outline-none group rounded-md bg-green px-3 font-bold text-lg text-white items-center relative overflow-hidden"
            href={`/api/download/${months.current?.value}`}
        >
            <span className="pr-1 font-semibold flex-1">
                <FontAwesomeIcon icon={faDownload} />
            </span>
        </a>
    )

    return {
        selectMonths,
        paymentList,
        downloadButton,
        payments,
        deleteModal,
    }
}