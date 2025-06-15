import { useState } from "react";
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

const getPasswordStrength = (password: string) => {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[@$!%*?&#]/.test(password)) score++;

    if (score <= 2) return { label: "Weak", color: "#e74c3c", value: 33 };
    if (score === 3 || score === 4) return { label: "Moderate", color: "#f39c12", value: 66 };
    return { label: "Strong", color: "#2ecc71", value: 100 };
};

export default function FormRegister() {
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        fullname: "",
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const passwordStrength = getPasswordStrength(formData.password);

    const validate = () => {
        const newErrors = { fullname: "", email: "", password: "" };

        if (!formData.fullname.trim()) {
            newErrors.fullname = "Full name is required.";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email address.";
        }

        if (!formData.password.trim()) {
            newErrors.password = "Password is required.";
        } else if (passwordStrength.value < 66) {
            newErrors.password = "Please choose a stronger password.";
        }

        setErrors(newErrors);
        return !newErrors.fullname && !newErrors.email && !newErrors.password;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                setErrors((prev) => ({
                    ...prev,
                    email: data.error || "Registration failed",
                }));
                return;
            }

            console.log("Registration successful!", data);
            // Optionally reset form or redirect
            setFormData({ fullname: "", email: "", password: "" });
            // router.push("/success"); // if using useRouter
        } catch (err) {
            console.error("An error occurred:", err);
            setErrors((prev) => ({
                ...prev,
                email: "Something went wrong. Please try again.",
            }));
        }
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
                    <h3>Welcome Aboard!<br className={style.space} /> Let’s Get You Set Up.</h3>
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

                                <div className={style.password}>
                                    <Input
                                        type="password"
                                        label="New Password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        error={errors.password}
                                        toggleVisibility={() => setShowPassword((prev) => !prev)}
                                        showPassword={showPassword}
                                    />
                                    {formData.password && (
                                        <div className={style.strengthWrapper}>
                                            <div className={style.strengthBar}>
                                                <div
                                                    className={style.strengthFill}
                                                    style={{ width: `${passwordStrength.value}%`, backgroundColor: passwordStrength.color }}
                                                />
                                            </div>
                                            <p className={style.strengthLabel} style={{ color: passwordStrength.color }}>
                                                {passwordStrength.label}
                                            </p>
                                        </div>
                                    )}
                                </div>


                            </div>
                            <ButtonPrimary type="submit">Sign Up</ButtonPrimary>
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
