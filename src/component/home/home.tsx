import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import style from "./style.module.scss";
import ButtonPrimary from "@/element/button/primary/primary";
import ButtonSecondary from "@/element/button/secondary/secondary";

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

const fadeScaleButtons: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
            staggerChildren: 0.4,
        },
    },
};

const bounceVariant: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 150,
            damping: 12,
        },
    },
};

export default function Home() {
    const router = useRouter();

    const handleShow = () => {
        router.push("/events");
    };

    const handleAttend = () => {
        router.push("/checkin");
    };

    return (
        <motion.div
            className={style.wrapper}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div className={style.heading} variants={fadeUp}>
                <h1>Zentry</h1>
                <p>Smarter Access. Seamless Entry.</p>
            </motion.div>

            <motion.div className={style.imagewrapper} variants={fadeUp}>
                <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/attend-coral.png`}
                    alt={"Zentry"}
                    fill
                    priority
                />
            </motion.div>

            <motion.div className={style.btngroup} variants={fadeScaleButtons}>
                <motion.div variants={bounceVariant}>
                    <ButtonPrimary onClick={handleAttend}>Attend Event</ButtonPrimary>
                </motion.div>

                <motion.div variants={bounceVariant}>
                    <ButtonSecondary onClick={handleShow}>Show Agenda</ButtonSecondary>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
