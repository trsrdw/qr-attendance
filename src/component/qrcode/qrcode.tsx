import { useRouter } from "next/navigation";
import ButtonPrimary from "@/element/button/primary/primary";
import style from "./style.module.scss";

type AttendeeProps = {
    fullname: string;
    email: string;
};

export default function QRCode({ fullname, email }: AttendeeProps) {
    const firstName = fullname.trim().split(/\s+/)[0] || "there";
    const router = useRouter();

    const handleAttend = () => {
        router.push("/checkin");
    };

    return (
        <div className={style.wrapper}>
            <div className={style.heading}>
                <h2>Thanks, {firstName}!</h2>
                <p>You&#39;re registered with {email}</p>
            </div>
            <p>🎉 Save this QR code for check in.</p>
            <ButtonPrimary onClick={handleAttend}>Check In</ButtonPrimary>
        </div>
    );
}
