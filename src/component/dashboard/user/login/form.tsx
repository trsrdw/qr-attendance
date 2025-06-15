"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";
import Input from "@/element/input/input";
import style from "./style.module.scss";
import ButtonPrimary from "@/element/button/primary/primary";
import SvgIcon from "@/element/icon/svg";
import ButtonIcon from "@/element/button/icon/icon";
import Image from "next/image";

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

export default function FormLogin() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const validate = () => {
        const newErrors = { email: "", password: "" };

        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email address.";
        }

        if (!formData.password.trim()) {
            newErrors.password = "Password is required.";
        }

        setErrors(newErrors);
        return !newErrors.email && !newErrors.password;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);

        const res = await signIn("credentials", {
            redirect: false,
            email: formData.email,
            password: formData.password,
        });

        setLoading(false);

        if (res?.ok) {
            router.push("/dashboard");
        } else {
            setErrors((prev) => ({
                ...prev,
                password: "Invalid email or password.",
            }));
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
                            alt="Login Illustration"
                            fill
                            priority
                        />
                    </div>
                </div>
                <div className={style.right}>
                    <h3>Good to See You Again.<br className={style.space} /> Let’s Get to Work.</h3>
                    <div className={style.formwrapper}>
                        <form onSubmit={handleSubmit} noValidate>
                            <div className={style.group}>
                                <Input
                                    type="email"
                                    label="Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                />
                                <Input
                                    type="password"
                                    label="Password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    error={errors.password}
                                />
                            </div>
                            <ButtonPrimary type="submit" disabled={loading}>
                                {loading ? "Signing In..." : "Sign In"}
                            </ButtonPrimary>
                        </form>

                        <div className={style.auth}>
                            <div className={style.alt}>
                                <p>OR</p>
                                <p className={style.or}>Sign in with</p>
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
