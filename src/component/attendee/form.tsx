import { useState } from "react";
import { motion, Variants } from "framer-motion";
import Input from "@/element/input/input";
import style from "./style.module.scss";
import ButtonPrimary from "@/element/button/primary/primary";
import SvgIcon from "@/element/icon/svg";
import ButtonIcon from "@/element/button/icon/icon";
import Image from "next/image";

type FormProps = {
    onSuccess: (attendee: { fullname: string; email: string }) => void;
};

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.4,
        },
    },
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

export default function FormAttendee({ onSuccess }: FormProps) {
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
        setErrors({ ...errors, [e.target.name]: "" });
    };

    return (
        <motion.div
            className={style.wrapper}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div className={style.card} variants={fadeUp}>
                <div className={style.left}>
                    <div className={style.imagewrapper}>
                        <Image
                            src={`${process.env.NEXT_PUBLIC_BASE_URL}/step.png`}
                            alt={"Zentry"}
                            fill
                            priority
                        />
                    </div>
                </div>
                <div className={style.right}>
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

                        <div className={style.auth}>
                            <div className={style.alt}>
                                <p>OR</p>
                                <p className={style.or}>Sign up with</p>
                            </div>
                            <div className={style.icongroup}>
                                <ButtonIcon>
                                    <SvgIcon url={`${process.env.NEXT_PUBLIC_BASE_URL}/google.svg`} />
                                </ButtonIcon>
                                <ButtonIcon className={style.in}>
                                    <SvgIcon url={`${process.env.NEXT_PUBLIC_BASE_URL}/linkedin.svg`} />
                                </ButtonIcon>
                                <ButtonIcon>
                                    <SvgIcon url={`${process.env.NEXT_PUBLIC_BASE_URL}/facebook.svg`} />
                                </ButtonIcon>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
