import { useState } from "react";
import Input from "@/element/input/input";
import style from "./style.module.scss";
import ButtonPrimary from "@/element/button/primary/primary";

type FormProps = {
    onSuccess: (attendee: { fullname: string; email: string }) => void;
};

export default function Form({ onSuccess }: FormProps) {
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
    });

    const [errors, setErrors] = useState({
        fullname: "",
        email: "",
    });

    const validate = () => {
        const newErrors = { fullname: "", email: "" };

        if (!formData.fullname.trim()) {
            newErrors.fullname = "Full name is required.";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email address.";
        }

        setErrors(newErrors);
        return !newErrors.fullname && !newErrors.email;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            // proceed with submit
            console.log("Form submitted:", formData);
            onSuccess(formData);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" }); // clear error on change
    };

    return (
        <div className={style.wrapper}>
            <h3>Take a seat using email, then <br /> check it for confirmation</h3>

            <div className={style.formwrapper}>
                <form onSubmit={handleSubmit} noValidate>
                    <div className={style.group}>
                        <Input
                            type="text"
                            label="Full Name"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleChange}
                            error={errors.fullname}
                        />
                        <Input
                            type="email"
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                    </div>
                    <ButtonPrimary>Submit</ButtonPrimary>
                </form>
            </div>
        </div>
    );
}
