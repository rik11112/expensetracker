import React from "react";

interface MenuItemProps {
    title: string;
    description: string;
    onClick?: () => void;
}


export default function MenuItemWithDescription({title, description, onClick}: MenuItemProps) {
    return (
        <li>
            <div className="flex p-2 rounded hover:bg-light-green " onClick={onClick} id={`dropdown-item-${title.replaceAll(' ', '-')}`}>
                <div className="ml-2 text-sm">
                    <label htmlFor="helper-checkbox-3"
                           className="font-medium">
                        <div className="text-blue text-xl">{title}</div>
                        <p className="text-dark-blue text-md" id="helper-checkbox-text-3">{description}</p>
                    </label>
                </div>
            </div>
        </li>
    )
}
