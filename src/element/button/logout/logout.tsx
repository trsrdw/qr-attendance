"use client";

import { signOut } from "next-auth/react";

export default function ButtonLogout() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: "/auth/login" })}
            style={{
                padding: "0.5rem 1rem",
                border: "1px solid #ccc",
                borderRadius: "6px",
                backgroundColor: "#fff",
                cursor: "pointer",
            }}
        >
            Logout
        </button>
    );
}
