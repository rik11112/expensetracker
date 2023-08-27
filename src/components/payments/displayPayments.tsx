import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useGetPayments from "@src/hooks/payments/useGetPayments"
import { LegacyRef, useEffect, useRef } from "react";


export default function displayPayments() {
    const {
        payments,
        error,
        isError,
        isFetching,
        fetchStatus,
        changeMonths,
    } = useGetPayments();
    const months = useRef<HTMLSelectElement>(null);

    const selectMonths = (
        <select ref={months} className="border border-gray-300 rounded-md p-1" onChange={e => changeMonths(parseInt(e.target.value))}>
            <option value="1">1 month</option>
            <option value="2">2 months</option>
            <option value="3">3 months</option>
            <option value="6">6 months</option>
            <option value="12">1 year</option>
            <option value="0">all</option>
        </select>
    )

    const paymentList = payments?.map((payment) => {
        const isPositive = payment.amount >= 0;
        const sign = isPositive ? "+" : ""
        const color = isPositive ? "text-green-500" : "text-red-500"
        return (
            <div
                style={{ backgroundColor: payment.category.color }}
                key={payment.paymentId}
                className={`bar-shadow rounded-md text-3xl my-3 p-3 text-center text-white`}>
                <div className="flex items-center justify-between">
                    <span className={`${color} multi-shadow-text`}>{sign}{payment.amount / 100}</span>
                    <span >{payment.date}</span>
                </div>
                {payment.note && <span className="text-lg">{payment.note}</span>}
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
    }
}