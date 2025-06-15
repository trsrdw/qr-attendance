"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import FormLogin from "@/component/dashboard/user/login/form";

export default function LoginPage() {
    const { status } = useSession();
    const router = useRouter();
    // const [isLogin, setIsLogin] = useState(true);

    useEffect(() => {
        if (status === "authenticated") {
            router.replace("/dashboard/home"); // already logged in → redirect
        }
    }, [status, router]);

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    return (
        <FormLogin />
        // <div style={{ padding: "2rem", maxWidth: "1000px", margin: "auto" }}>
        //     <h2 style={{ textAlign: "center" }}>
        //         {isLogin ? "Login to Your Account" : "Register an Account"}
        //     </h2>

        //     {isLogin ? <FormLogin /> : <FormRegister />}

        //     <p style={{ marginTop: "1rem", textAlign: "center" }}>
        //         {isLogin ? (
        //             <>
        //                 Don&#39;t have an account?{" "}
        //                 <button
        //                     onClick={() => setIsLogin(false)}
        //                     style={{ color: "blue", textDecoration: "underline", background: "none", border: "none", cursor: "pointer" }}
        //                 >
        //                     Register
        //                 </button>
        //             </>
        //         ) : (
        //             <>
        //                 Already have an account?{" "}
        //                 <button
        //                     onClick={() => setIsLogin(true)}
        //                     style={{ color: "blue", textDecoration: "underline", background: "none", border: "none", cursor: "pointer" }}
        //                 >
        //                     Login
        //                 </button>
        //             </>
        //         )}
        //     </p>
        // </div>
    );
}
