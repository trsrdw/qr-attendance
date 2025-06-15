import { useId } from "react";
import style from "./style.module.scss";

type InputProps = {
    type: "text" | "password" | "email";
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    toggleVisibility?: () => void;
    showPassword?: boolean;
};

export default function Input({
    type,
    label,
    name,
    value,
    onChange,
    error,
    toggleVisibility,
    showPassword,
}: InputProps) {
    const generatedId = useId();
    const inputId = `${generatedId}-${name}`;

    const hasValue = value.trim().length > 0;
    const isPassword = type === "password" && typeof toggleVisibility === "function";

    return (
        <div
            className={`${style.inputContainer} ${hasValue ? style.hasValue : ""} ${error ? style.hasError : ""
                }`}
        >
            <input
                type={isPassword && showPassword ? "text" : type}
                id={inputId}
                name={name}
                value={value}
                onChange={onChange}
                autoComplete={type === "password" ? "new-password" : "off"}
            />
            <label htmlFor={inputId}>{label}</label>

            {isPassword && (
                <button
                    type="button"
                    className={style.toggle}
                    onClick={toggleVisibility}
                    aria-label="Toggle password visibility"
                >
                    {showPassword ? "👁️" : "🙈"}
                </button>
            )}

            <div className={style.bar}></div>
            {error && <span className={style.error}>{error}</span>}
        </div>
    );
}
