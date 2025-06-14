import style from "./style.module.scss";

type InputProps = {
    type: "text" | "password" | "email";
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
};

export default function Input({
    type,
    label,
    name,
    value,
    onChange,
    error,
}: InputProps) {
    const hasValue = value.trim().length > 0;

    return (
        <div
            className={`${style.inputContainer} ${hasValue ? style.hasValue : ""} ${error ? style.hasError : ""
                }`}
        >
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
            />
            <label htmlFor={name}>{label}</label>
            <div className={style.bar}></div>
            {error && <span className={style.error}>{error}</span>}
        </div>
    );
}
