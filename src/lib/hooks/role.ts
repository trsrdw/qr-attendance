import { useSession } from "next-auth/react";

export function useRole() {
    const { data: session, status } = useSession();

    const role = session?.user?.role ?? "general"; // fallback
    const isAuthenticated = status === "authenticated";

    const isStaff = role === "staff";
    const isSuperadmin = role === "superadmin";
    const isGeneral = role === "general" || !isAuthenticated;

    return {
        role,
        isAuthenticated,
        isStaff,
        isSuperadmin,
        isGeneral,
    };
}
