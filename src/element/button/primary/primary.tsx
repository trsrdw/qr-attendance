import { ReactNode, MouseEvent, useState } from "react";
import style from "./style.module.scss";

interface ButtonProps {
    children: ReactNode;
    className?: string;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
}

export default function ButtonPrimary({
    children,
    className = "",
    onClick,
    disabled = false,
    type = "button",
}: ButtonProps) {
    const [clicked, setClicked] = useState(false);

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        if (disabled) return;
        setClicked(true);
        setTimeout(() => setClicked(false), 200);
        if (onClick) onClick(e);
    };

    return (
        <button
            type={type}
            onClick={handleClick}
            disabled={disabled}
            className={`
                ${style.primary} 
                ${className} 
                ${clicked ? style.clicked : ""} 
                ${disabled ? style.disabled : ""}
            `}
        >
            {children}
        </button>
    );
}
