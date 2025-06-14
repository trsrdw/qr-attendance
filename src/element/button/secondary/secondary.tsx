import { ReactNode, MouseEvent, useState } from "react";
import style from "./style.module.scss";

interface ButtonSecondaryProps {
    children: ReactNode;
    className?: string;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function ButtonSecondary({
    children,
    className = "",
    onClick
}: ButtonSecondaryProps) {
    const [clicked, setClicked] = useState(false);

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        setClicked(true);
        setTimeout(() => setClicked(false), 200);
        if (onClick) onClick(e);
    };

    return (
        <button
            onClick={handleClick}
            className={`${style.secondary} ${className} ${clicked ? style.clicked : ""
                }`}
        >
            {children}
        </button>
    );
}
