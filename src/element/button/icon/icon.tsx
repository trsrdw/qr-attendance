import { ReactNode, MouseEvent, useState } from "react";
import style from "./style.module.scss";

interface ButtonIconProps {
    children: ReactNode;
    className?: string;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function ButtonIcon({
    children,
    className = "",
    onClick
}: ButtonIconProps) {
    const [clicked, setClicked] = useState(false);

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        setClicked(true);
        setTimeout(() => setClicked(false), 200);
        if (onClick) onClick(e);
    };

    return (
        <button
            onClick={handleClick}
            className={`${style.icon} ${className} ${clicked ? style.clicked : ""
                }`}
        >
            {children}
        </button>
    );
}
