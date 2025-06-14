import { ReactNode } from "react";
import style from "./style.module.scss";

interface ContainerProps {
    children: ReactNode;
    className?: string;
}

export default function Container({ children, className = "" }: ContainerProps) {
    return (
        <div className={`${style.container} ${className}`}>
            {children}
        </div>
    );
}
