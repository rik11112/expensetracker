import React from "react";

interface ISearchbarProps {
    setValue: React.Dispatch<React.SetStateAction<string>>;
    className?: string;
}

export default function Searchbar({ setValue, className }: ISearchbarProps) {
    return (
        <>
            <div className={`${className} relative`}>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-lighter-gray "
                        fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            className="text-gray"></path>
                    </svg>
                </div>
                <input type="text" id="search-bar" onChange={(e) => setValue(e.target.value)}
                    className="text-lg rounded-lg block w-full pl-10 p-1 focus:outline-blue text-dark-blue"
                    placeholder="Search" required />
            </div>
        </>
    )
}