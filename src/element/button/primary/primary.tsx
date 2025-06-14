import { ReactNode, MouseEvent, useState } from "react";
import style from "./style.module.scss";

interface ButtonPrimaryProps {
    children: ReactNode;
    className?: string;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function ButtonPrimary({
    children,
    className = "",
    onClick
}: ButtonPrimaryProps) {
    const [clicked, setClicked] = useState(false);

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        setClicked(true);
        setTimeout(() => setClicked(false), 200);
        if (onClick) onClick(e);
    };

    return (
        <button
            onClick={handleClick}
            className={`${style.primary} ${className} ${clicked ? style.clicked : ""
                }`}
        >
            {children}
        </button>
    );
}
