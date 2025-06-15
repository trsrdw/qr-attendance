"use client";
import { useState } from "react";
import Form from "@/component/registration/form";
// import Container from "@/element/container/container";
import QRCode from "@/component/qrcode/qrcode";

type Attendee = {
    fullname: string;
    email: string;
};

export default function Page() {
    const [attendee, setAttendee] = useState<Attendee | null>(null);

    return (
        <>
            {attendee ? (
                <QRCode fullname={attendee.fullname} email={attendee.email} />
            ) : (
                <Form onSuccess={setAttendee} />
            )}
            {/* <QRCode fullname={"Tiara Sari Dewi"} email={"trsrdw@gmail.com"} /> */}
        </>
    );
}
